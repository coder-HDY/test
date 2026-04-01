---
applyTo: "**"
---

# コーディングルール / 编码规范

## 概要

新しい機能関数を実装する際は、必ず以下の3つのステップを順番に実行すること。
新功能函数开发时，请严格按以下三步执行。

---

## ステップ 1：先にテストコードを書く（TDD）

新しい関数を `tools/` 配下のファイルに追加する場合、**実装の前に**対応するテストファイルを作成・更新すること。

### テストファイルの配置ルール

- ソースファイルのパス構造を `test/` 配下に**そのまま鏡映**する
- ファイル名は `*.test.js` とする

```
tools/dateTool.js          → test/tools/dateTools.test.js
tools/array/arrayTool.js   → test/tools/array/arrayTools.test.js
```

---

## ステップ 2：テストは 3A 原則（AAA パターン）で書く

すべてのテストケースは **Arrange → Act → Assert** の3段階コメントを明記すること。

```js
it('should return correct diff when given two dates', () => {
  // Arrange
  const date1 = new Date('2026-01-01');
  const date2 = new Date('2026-01-05');

  // Act
  const result = getDateDiff(date1, date2);

  // Assert
  expect(result.days).toBe(4);
});
```

### テストが必ずカバーすべき項目

- 正常系：一般的な入力と期待される出力
- 境界値：最小値・最大値・ゼロ・空
- 異常系：不正な入力でエラーが正しくスローされること
- 型のバリエーション：文字列・Date オブジェクト等、複数の入力形式

---

## ステップ 3：日本語のAPIドキュメントを `docs/` に生成する

### ファイル構成

```
docs/
  README.md               ← 全体目次（カテゴリ別リンク一覧）
  tools/
    dateTool.md           ← 日付ツール関数の詳細ドキュメント
    arrayTool.md          ← 配列ツール関数の詳細ドキュメント（例）
```

### `docs/README.md` の書き方（全体目次）

`docs/README.md` にはカテゴリごとに関数の一覧を記載し、各関数名は詳細ドキュメント内の対応するアンカーへリンクすること。

```markdown
## 日付操作

1. [getCurrentDate](./tools/dateTool.md#getcurrentdate)
2. [getDateDiff](./tools/dateTool.md#getdatediff)
3. [getDayOfWeek](./tools/dateTool.md#getdayofweek)

## 配列操作

1. [filterUnique](./tools/arrayTool.md#filterunique)
```

### 各詳細ドキュメントの書き方

各関数につき以下の項目を日本語で記述すること：

```markdown
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
```

---

## チェックリスト（実装完了の定義）

新機能を実装し終えたら、以下がすべて満たされていることを確認する：

- [ ] `test/` 配下に対応するテストファイルが存在する
- [ ] すべてのテストケースが 3A 原則に従って記述されている
- [ ] 正常系・境界値・異常系のテストが含まれている
- [ ] `npm test` がすべて PASS する
- [ ] `docs/README.md` の全体目次に関数が追加されている
- [ ] `docs/tools/` 配下に日本語の詳細ドキュメントが作成・更新されている

---

## 重要：AI アシスタントへの指示

上記チェックリストがすべて完了した時点で：

**必ず停止して、ユーザーの確認を待つこと。勝手に `git commit` を実行しないこと。**

正しい流れ：
1. コード実装完了
2. テスト実行 → すべて PASS
3. ドキュメント作成・更新完了
4. チェックリスト確認完了 → **ここで停止**
5. ユーザーに「実装完了」と報告する

**絶対禁止：** チェックリスト完了後に勝手に commit/push を実行する
