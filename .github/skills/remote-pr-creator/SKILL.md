---
name: remote-pr-creator
description: "远程发起 PR 工作流。Use when: 向远程仓库推送新分支并创建 Pull Request；自动追加 cicd workflow；一键完成分支创建、workflow 注入、推送、PR 提交。触发词：发起pr、创建pr、推送分支、cicd workflow、remote pr、push pr、new branch pr。"
argument-hint: "项目目录路径（可选，未填写时会交互询问）"
---

# Remote PR Creator

自动化完成以下操作：**输入项目目录 → 合规检测 → 环境检查 → 新建分支 → 注入 CICD Workflow → 推送 → 创建 PR**。支持一次操作多个仓库，并自动记忆历史路径。

---

## 触发方式

用户说以下任一内容时加载本技能：

- 向远程仓库发起 PR
- 推送分支并开 PR
- 帮我创建一个 cicd pr
- 一键发起 pull request

---

## 执行步骤

### Step 0 — 获取项目目录列表（支持多仓库）

**必须明确获取用户指定的目录，绝对不能默认使用当前工作目录。**

#### 0a. 读取历史记录

使用 `memory` 工具执行 `view` 命令，读取 `/memories/remote-pr-creator-repos.md`。

- 若文件不存在或为空，则 `<HISTORY_PATHS>` = 空列表，进入**情况二**。
- 若文件存在，提取其中所有以 `/` 开头的行作为 `<HISTORY_PATHS>`（每行一条绝对路径）。

#### 0b. 构建选择框

**情况一：`<HISTORY_PATHS>` 不为空（有历史记录）**

使用 `vscode_askQuestions` 展示多选框（`multiSelect: true`）：

```
问题：请选择要操作的仓库（可多选）
options:
  - "全选（所有历史仓库）"
  - <历史路径 1>
  - <历史路径 2>
  - ...（每条历史路径一个选项）
  - "本仓库（当前工作区 <工作区路径>）"
  - "添加新路径..."
allowFreeformInput: true  ← 可直接粘贴路径
```

处理规则：

- 若用户选中了 **"全选（所有历史仓库）"**：将 `<HISTORY_PATHS>` 中全部路径加入目标列表。
- 若用户选中了某些历史路径：仅将这些路径加入目标列表。
- 若用户选中了 **"本仓库（当前工作区...）"**：将当前 VS Code 工作区根目录加入目标列表。
- 若用户选中了 **"添加新路径..."** 或在自由文本框中输入了内容：
  - 若用户在自由文本框中已直接填写路径，将该内容按换行拆分，每行作为一条路径追加到目标列表。
  - 否则，再弹出追问框：
    ```
    问题：请输入要添加的项目绝对路径（多个路径请每行一个）
    ```
    将每行作为一条路径追加到目标列表。

**情况二：`<HISTORY_PATHS>` 为空（无历史记录）**

使用 `vscode_askQuestions`：

```
问题：请选择目标项目目录（可多选）
multiSelect: true
options:
  - "本仓库（当前工作区 <工作区路径>）"
  - "输入其他路径..."
allowFreeformInput: true
```

- 若用户选中 **"本仓库"**：将当前工作区根目录加入目标列表。
- 若用户选中 **"输入其他路径..."** 或在自由文本框中输入了内容：
  - 若用户在自由文本框中已直接填写路径，将该内容按换行拆分，每行作为一条路径。
  - 否则，追问输入框，每行一条路径。

#### 0c. 保存路径到 memory

将目标列表中的所有路径与 `<HISTORY_PATHS>` 合并去重，得到最终路径列表 `<ALL_PATHS>`。

**文件格式：**

```
# remote-pr-creator 历史仓库

/path/to/repo1
/path/to/repo2
```

- 若 `/memories/remote-pr-creator-repos.md` **不存在**：使用 `memory create` 创建，写入上述格式。
- 若文件**已存在**：使用 `memory str_replace` 将整个文件内容替换为新内容（以读取到的完整旧内容作为 `old_str`，新的完整内容作为 `new_str`）。

#### 0d. 最终目录列表

将目标列表去重后得到 `<PROJECT_DIR_LIST>`（包含一或多个绝对路径），后续步骤对每个目录循环执行。

---

### Step 1 — 环境准备（gh CLI）

**1a. 检查安装：**

```bash
if ! command -v gh &>/dev/null; then
  HOMEBREW_NO_AUTO_UPDATE=1 brew install gh
fi
```

**1b. 检查登录状态：**

```bash
gh auth status 2>&1
```

- 若已认证，继续执行 Step 2。
- 若未认证，**不要通过工具代理交互式登录流程**。直接告知用户在终端运行 `gh auth login` 完成授权，等待用户确认已登录后再继续。

---

### Step 2 — 逐仓库执行核心脚本

找到本 SKILL.md 所在目录（即 `<SKILL_DIR>`），对 `<PROJECT_DIR_LIST>` 中的**每个路径依次执行**：

```bash
bash "<SKILL_DIR>/run.sh" "<PROJECT_DIR>"
```

将 `<SKILL_DIR>` 替换为本文件的绝对目录路径，`<PROJECT_DIR>` 替换为当前循环中的路径。

脚本内部会依次自动完成以下所有操作：

1. 合规性检测（目录存在、git remote、推送权限）
2. 检测远程默认分支（不假设为 `main`）
3. 创建 `feature/cicd-YYYYMMDD` 分支（已存在则直接切换）
4. 覆盖写入 `.github/workflows/cicd.yml`，仅在有变更时提交
5. 推送分支到远程
6. 创建 PR（已存在则输出已有链接，不重复创建）

若任一步骤失败，脚本自动回滚本地分支并输出日志路径供排查。每个仓库执行后立即输出该仓库的摘要，然后继续处理下一个。

---

## 完成确认

所有仓库执行完毕后，汇总展示最终结果：

```
✅ 全部完成！共处理 N 个仓库

  [1] /path/to/repo1
      分支：feature/cicd-YYYYMMDD → <默认分支>
      PR 链接：https://github.com/...

  [2] /path/to/repo2
      分支：feature/cicd-YYYYMMDD → <默认分支>
      PR 链接：https://github.com/...

📋 完整日志：/tmp/remote-pr-creator-YYYYMMDD.log
```

如有仓库执行失败，在摘要中以 ❌ 标记并附上对应日志路径。

---

## 注意事项

- Deploy 步骤为占位符，提醒用户填写实际部署命令
- Windows 用户需额外检查 Git Bash 或 WSL 环境
