# 配列ツール (arrayTool) — 詳細ドキュメント

ソースファイル: [`tools/arrayTool.js`](../../tools/arrayTool.js)  
テストファイル: [`test/tools/arrayTool.test.js`](../../test/tools/arrayTool.test.js)  
依存ライブラリ: [lodash](https://lodash.com/)

---

## 目次

- [arrayIntersection](#arrayintersection)
- [arrayUnion](#arrayunion)
- [arrayDifference](#arraydifference)

---

## arrayIntersection

**概要**：2つの配列の**交集合（AND）**を返す。両方の配列に存在する要素のみを含む新しい配列を返す。重複は除去される。

**シグネチャ**

```js
arrayIntersection(arr1, arr2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `arr1` | `Array` | ✅ | 1つ目の配列 |
| `arr2` | `Array` | ✅ | 2つ目の配列 |

**戻り値** `Array`

両方の配列に共通して存在する要素の配列（重複なし）。

**使用例**

```js
const { arrayIntersection } = require('./tools/arrayTool');

// 数値配列
const result1 = arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]);
console.log(result1); // [3, 4]

// 文字列配列
const result2 = arrayIntersection(['apple', 'banana', 'cherry'], ['banana', 'cherry', 'date']);
console.log(result2); // ['banana', 'cherry']

// 交集合なし
const result3 = arrayIntersection([1, 2, 3], [4, 5, 6]);
console.log(result3); // []
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| `arr1` または `arr2` が配列でない（`null`、`undefined`、文字列、数値、オブジェクトなど） | `Both arguments must be arrays` |

---

## arrayUnion

**概要**：2つの配列の**和集合（OR）**を返す。どちらかの配列に存在する要素をすべて含む新しい配列を返す。重複は除去される。

**シグネチャ**

```js
arrayUnion(arr1, arr2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `arr1` | `Array` | ✅ | 1つ目の配列 |
| `arr2` | `Array` | ✅ | 2つ目の配列 |

**戻り値** `Array`

両方の配列に含まれるすべての要素の配列（重複なし、`arr1` の順序を優先）。

**使用例**

```js
const { arrayUnion } = require('./tools/arrayTool');

// 数値配列
const result1 = arrayUnion([1, 2, 3], [3, 4, 5]);
console.log(result1); // [1, 2, 3, 4, 5]

// 文字列配列
const result2 = arrayUnion(['apple', 'banana'], ['banana', 'cherry']);
console.log(result2); // ['apple', 'banana', 'cherry']

// 空配列との演算
const result3 = arrayUnion([1, 2, 3], []);
console.log(result3); // [1, 2, 3]
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| `arr1` または `arr2` が配列でない（`null`、`undefined`、文字列、数値、オブジェクトなど） | `Both arguments must be arrays` |

---

## arrayDifference

**概要**：2つの配列の**差集合（MINUS）**を返す。`arr1` に存在するが `arr2` には存在しない要素を含む新しい配列を返す。元の配列は変更されない（不変）。

**シグネチャ**

```js
arrayDifference(arr1, arr2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `arr1` | `Array` | ✅ | 基準となる配列。この配列からの差分を計算する |
| `arr2` | `Array` | ✅ | 除外する要素を含む配列 |

**戻り値** `Array`

`arr1` に存在し、かつ `arr2` に存在しない要素の配列。

**使用例**

```js
const { arrayDifference } = require('./tools/arrayTool');

// 数値配列
const result1 = arrayDifference([1, 2, 3, 4], [3, 4, 5, 6]);
console.log(result1); // [1, 2]

// 文字列配列
const result2 = arrayDifference(['apple', 'banana', 'cherry'], ['banana']);
console.log(result2); // ['apple', 'cherry']

// arr2 が arr1 のすべてを含む場合
const result3 = arrayDifference([1, 2, 3], [1, 2, 3, 4, 5]);
console.log(result3); // []

// arr2 が空の場合
const result4 = arrayDifference([1, 2, 3], []);
console.log(result4); // [1, 2, 3]
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| `arr1` または `arr2` が配列でない（`null`、`undefined`、文字列、数値、オブジェクトなど） | `Both arguments must be arrays` |
