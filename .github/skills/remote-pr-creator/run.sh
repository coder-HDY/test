#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  remote-pr-creator/run.sh
#  用法: bash run.sh <PROJECT_DIR>
#
#  功能：合规检测 → 默认分支检测 → 创建分支（幂等）
#        → 注入 cicd.yml（覆盖）→ 提交 → 推送 → 创建 PR（幂等）
#        → 失败时自动回滚本地分支
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# ── 参数 ─────────────────────────────────────────────────────
PROJECT_DIR="${1:?'用法: bash run.sh <PROJECT_DIR>'}"
DATE=$(date +%Y%m%d)
TODAY=$(date +%Y-%m-%d)
BRANCH="feature/cicd-${DATE}"
DEFAULT_BRANCH=""   # 后续检测后赋值，供 trap 使用

LOG_FILE="/tmp/remote-pr-creator-${DATE}.log"

# ── 日志工具 ─────────────────────────────────────────────────
log()  { echo "$*" | tee -a "$LOG_FILE"; }
fail() { log "❌ $*"; exit 1; }

log "=== remote-pr-creator 开始 $(date '+%Y-%m-%d %H:%M:%S') ==="
log "PROJECT_DIR : $PROJECT_DIR"
log "BRANCH      : $BRANCH"

# ── 错误回滚 trap ─────────────────────────────────────────────
cleanup() {
  local code=$?
  [[ $code -eq 0 ]] && return
  log ""
  log "❌ 执行失败 (exit $code)，开始清理..."
  if [[ -n "$DEFAULT_BRANCH" ]]; then
    git -C "$PROJECT_DIR" checkout "$DEFAULT_BRANCH" 2>/dev/null || true
  fi
  git -C "$PROJECT_DIR" branch -D "$BRANCH" 2>/dev/null \
    && log "  已删除本地分支 $BRANCH" || true
  log "📋 完整日志：$LOG_FILE"
}
trap cleanup EXIT

# ── Step 1: 合规性检测 ────────────────────────────────────────
log ""
log "── Step 1: 合规性检测 ──"

[[ -d "$PROJECT_DIR" ]] || fail "目录不存在: $PROJECT_DIR"
cd "$PROJECT_DIR"

REMOTE_URL=$(git remote get-url origin 2>/dev/null) \
  || fail "未找到 git remote origin，请先关联远程仓库"
log "✅ Remote   : $REMOTE_URL"

git ls-remote --heads origin HEAD >/dev/null 2>&1 \
  || fail "无法访问远程仓库，请检查权限或网络"

OWNER_REPO=$(echo "$REMOTE_URL" | sed -E 's|.*[:/]([^/]+)/([^/.]+)(\.git)?$|\1/\2|')
log "✅ 仓库      : $OWNER_REPO"

# ── 检测默认分支 ──────────────────────────────────────────────
DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | awk '{print $NF}')
log "✅ 默认分支  : $DEFAULT_BRANCH"

# ── Step 2: 创建分支（幂等）─────────────────────────────────
log ""
log "── Step 2: 创建分支 ──"

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  log "⚠️  分支 $BRANCH 已存在，直接切换"
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH"
  log "✅ 已创建分支：$BRANCH"
fi

# ── Step 3: 注入 CICD Workflow（覆盖写入）────────────────────
log ""
log "── Step 3: 注入 cicd.yml ──"

mkdir -p .github/workflows

# 写入模板（YAML 中的 ${{ }} 和 $(date) 不被 shell 展开）
cat > .github/workflows/cicd.yml << 'YAML'
name: CICD Deploy

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy
        run: |
          echo "部署开始..."
          # TODO: 在此添加实际部署命令

      - name: Summary
        run: |
          echo "## 🚀 部署摘要" >> $GITHUB_STEP_SUMMARY
          echo "| 字段 | 值 |" >> $GITHUB_STEP_SUMMARY
          echo "|------|-----|" >> $GITHUB_STEP_SUMMARY
          echo "| 部署时间 | $(date '+%Y-%m-%d %H:%M:%S UTC') |" >> $GITHUB_STEP_SUMMARY
          echo "| 触发分支 | ${{ github.ref_name }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Commit SHA | ${{ github.sha }} |" >> $GITHUB_STEP_SUMMARY
          echo "| 触发者 | ${{ github.actor }} |" >> $GITHUB_STEP_SUMMARY
          echo "| 工作流运行 ID | ${{ github.run_id }} |" >> $GITHUB_STEP_SUMMARY
YAML

# 将占位符替换为实际默认分支
sed "s|main|${DEFAULT_BRANCH}|g" \
  .github/workflows/cicd.yml > .github/workflows/cicd.yml.tmp \
  && mv .github/workflows/cicd.yml.tmp .github/workflows/cicd.yml

log "✅ 已写入 .github/workflows/cicd.yml（branches: ${DEFAULT_BRANCH}）"

git add .github/workflows/cicd.yml

# 仅在有实际变更时才提交（幂等）
if ! git diff --cached --quiet; then
  git commit -m "ci: add cicd workflow with deploy summary [$TODAY]"
  log "✅ 已提交"
else
  log "ℹ️  cicd.yml 无变更，跳过提交"
fi

# ── Step 4: 推送并创建 PR（幂等）────────────────────────────
log ""
log "── Step 4: 推送并创建 PR ──"

git push -u origin "$BRANCH"
log "✅ 已推送分支：$BRANCH"

# 检查是否已有 PR，避免重复创建
EXISTING_PR=$(gh pr list \
  --head "$BRANCH" \
  --base "$DEFAULT_BRANCH" \
  --json url \
  --jq '.[0].url' 2>/dev/null || true)

if [[ -n "$EXISTING_PR" ]]; then
  log "ℹ️  PR 已存在：$EXISTING_PR"
  PR_URL="$EXISTING_PR"
else
  PR_BODY_FILE=$(mktemp)
  cat > "$PR_BODY_FILE" << 'PREOF'
## 变更说明

本 PR 由自动化脚本生成，包含以下内容：

- 新增 `.github/workflows/cicd.yml` CICD 部署工作流
- 部署完成后自动输出 Summary（部署时间、分支、Commit、触发者等关键信息）

## Checklist
- [ ] 已在 Deploy step 中填写实际部署命令
- [ ] 已验证 workflow 语法
PREOF

  PR_URL=$(gh pr create \
    --title "ci: add cicd workflow ($TODAY)" \
    --body-file "$PR_BODY_FILE" \
    --base "$DEFAULT_BRANCH" \
    --head "$BRANCH")
  rm -f "$PR_BODY_FILE"
fi

# ── 完成摘要 ─────────────────────────────────────────────────
log ""
log "✅ 全部完成！"
log "   分支：$BRANCH → $DEFAULT_BRANCH"
log "   PR 链接：$PR_URL"
log "📋 完整日志：$LOG_FILE"
