---
name: write-tests
description: 'Use when writing, creating, or adding tests for functions in tools/. Use when implementing TDD, unit tests, test cases, AAA pattern, Jest tests, writing test files under test/ directory, テスト作成, 테스트 작성.'
---

# Write Tests (TDD)

## When to Use

- 新しい関数を `tools/` 配下に追加するとき
- テストファイルを `test/` 配下に作成・更新するとき
- AAA パターンでテストを書くとき
- `npm test` を通すためのテストを整備するとき

## Procedure

### Step 1: テストファイルの配置

ソースファイルのパス構造を `test/` 配下にそのまま鏡映する。ファイル名は `*.test.js`。

```
tools/dateTool.js          → test/tools/dateTools.test.js
tools/array/arrayTool.js   → test/tools/array/arrayTools.test.js
```

### Step 2: AAA パターン（3A 原則）でテストを書く

すべてのテストケースに **Arrange → Act → Assert** の3段階コメントを必ず明記すること。

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

### Step 3: カバレッジの必須項目

| カテゴリ | 内容 |
|---|---|
| 正常系 | 一般的な入力と期待される出力 |
| 境界値 | 最小値・最大値・ゼロ・空 |
| 異常系 | 不正な入力でエラーが正しくスローされること |
| 型バリエーション | 文字列・Date オブジェクト等、複数の入力形式 |

### Step 4: 実行確認

`npm test` を実行し、すべて PASS することを確認する。
