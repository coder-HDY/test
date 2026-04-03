---
name: write-docs
description: 'Use when writing, generating, or updating API documentation in docs/. Use when creating Japanese docs, updating docs/README.md index, creating docs/tools/*.md, ドキュメント生成, API docs, 文档编写.'
---

# Write Docs (Japanese API Documentation)

## When to Use

- `tools/` 配下の関数に対するAPIドキュメントを作成・更新するとき
- `docs/README.md` の全体目次を更新するとき
- `docs/tools/` 配下の詳細ドキュメントを作成・更新するとき

## Procedure

### Step 1: ファイル構成

```
docs/
  README.md               ← 全体目次（カテゴリ別リンク一覧）
  tools/
    dateTool.md           ← 日付ツール関数の詳細ドキュメント
    arrayTool.md          ← 配列ツール関数の詳細ドキュメント
```

### Step 2: `docs/README.md` の更新（全体目次）

カテゴリごとに関数の一覧を記載し、各関数名は詳細ドキュメント内の対応するアンカーへリンクする。

```markdown
## 日付操作

1. [getCurrentDate](./tools/dateTool.md#getcurrentdate)
2. [getDateDiff](./tools/dateTool.md#getdatediff)

## 配列操作

1. [filterUnique](./tools/arrayTool.md#filterunique)
```

### Step 3: 各詳細ドキュメントの作成

各関数につき以下の項目を**日本語**で記述する。

````markdown
## 関数名

**概要**：関数の目的を1〜2文で説明

**シグネチャ**
```js
functionName(param1, param2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| param1 | Date\|string | ✅ | 開始日 |

**戻り値**

| プロパティ | 型 | 説明 |
|---|---|---|
| days | number | 差分日数 |

**使用例**
```js
const result = functionName('2026-01-01', '2026-01-10');
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 無効な日付形式 | `Invalid date format` |
````
