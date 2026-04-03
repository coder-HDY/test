# 日付ツール (dateTool) — 詳細ドキュメント

ソースファイル: [`tools/dateTool.js`](../../tools/dateTool.js)  
テストファイル: [`test/tools/dateTools.test.js`](../../test/tools/dateTools.test.js)

---

## 目次

- [getCurrentDate](#getcurrentdate)
- [getDateDiff](#getdatediff)
- [getDayOfWeek](#getdayofweek)
- [getTimestampDayDiff](#gettimestampdaydiff)

---

## getCurrentDate

**概要**：今日の日付を取得し、年・月・日および整形済み日付文字列を含むオブジェクトを返す。

**シグネチャ**

```js
getCurrentDate()
```

**パラメータ**

なし

**戻り値** `Object`

| プロパティ | 型 | 説明 |
|---|---|---|
| `year` | number | 現在の年（例: 2026） |
| `month` | number | 月（1〜12） |
| `day` | number | 日（1〜31） |
| `dateString` | string | `YYYY-MM-DD` 形式の文字列（例: `"2026-04-01"`） |

**使用例**

```js
const { getCurrentDate } = require('./tools/dateTool');

const today = getCurrentDate();
console.log(today);
// {
//   year: 2026,
//   month: 4,
//   day: 1,
//   dateString: "2026-04-01"
// }
```

**エラー**

なし（常に現在時刻を使用するため例外は発生しない）

---

## getDateDiff

**概要**：2つの日付の絶対差分を計算し、日数・時間数・分数・合計秒数を返す。入力の順序は問わない。

**シグネチャ**

```js
getDateDiff(date1, date2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `date1` | `Date` \| `string` | ✅ | 比較する1つ目の日付。`YYYY-MM-DD` 形式の文字列または `Date` オブジェクト。 |
| `date2` | `Date` \| `string` | ✅ | 比較する2つ目の日付。`YYYY-MM-DD` 形式の文字列または `Date` オブジェクト。 |

**戻り値** `Object`

| プロパティ | 型 | 説明 |
|---|---|---|
| `days` | number | 差分の日数（端数切り捨て） |
| `hours` | number | 日数を除いた残り時間数（0〜23） |
| `minutes` | number | 時間数を除いた残り分数（0〜59） |
| `totalSeconds` | number | 差分全体の合計秒数 |

**使用例**

```js
const { getDateDiff } = require('./tools/dateTool');

// Date オブジェクトを使用
const result1 = getDateDiff(new Date('2026-01-01'), new Date('2026-01-10'));
console.log(result1);
// { days: 9, hours: 0, minutes: 0, totalSeconds: 777600 }

// 文字列を使用
const result2 = getDateDiff('2026-04-01T10:30:00', '2026-04-01T12:45:00');
console.log(result2);
// { days: 0, hours: 2, minutes: 15, totalSeconds: 8100 }

// 入力順序は問わない（絶対値を返す）
const result3 = getDateDiff('2026-01-10', '2026-01-01');
console.log(result3.days); // 9
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 解析できない日付文字列を渡した場合 | `Invalid date format` |

```js
getDateDiff('not-a-date', '2026-01-01');
// Error: Invalid date format
```

---

## getDayOfWeek

**概要**：指定した日付の曜日を判定し、曜日インデックス・日本語曜日名・英語曜日名を含むオブジェクトを返す。

**シグネチャ**

```js
getDayOfWeek(date)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `date` | `Date` \| `string` | ✅ | 曜日を判定したい日付。`YYYY-MM-DD` 形式の文字列または `Date` オブジェクト。 |

**戻り値** `Object`

| プロパティ | 型 | 説明 |
|---|---|---|
| `day` | number | 日付の「日」部分（1〜31） |
| `dayIndex` | number | 曜日インデックス（`0` = 日曜日 〜 `6` = 土曜日） |
| `dayName` | string | 日本語の曜日名（例: `"星期三"`） |
| `dayNameEn` | string | 英語の曜日名（例: `"Wednesday"`） |
| `fullDate` | string | `YYYY-MM-DD` 形式の整形済み日付文字列 |

**曜日インデックス対応表**

| `dayIndex` | `dayName` | `dayNameEn` |
|---|---|---|
| 0 | 星期日 | Sunday |
| 1 | 星期一 | Monday |
| 2 | 星期二 | Tuesday |
| 3 | 星期三 | Wednesday |
| 4 | 星期四 | Thursday |
| 5 | 星期五 | Friday |
| 6 | 星期六 | Saturday |

**使用例**

```js
const { getDayOfWeek } = require('./tools/dateTool');

// Date オブジェクトを使用
const result1 = getDayOfWeek(new Date('2026-04-01'));
console.log(result1);
// {
//   day: 1,
//   dayIndex: 3,
//   dayName: "星期三",
//   dayNameEn: "Wednesday",
//   fullDate: "2026-04-01"
// }

// 文字列を使用
const result2 = getDayOfWeek('2026-04-05');
console.log(result2.dayName);    // "星期日"
console.log(result2.dayNameEn);  // "Sunday"
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| 解析できない日付文字列を渡した場合 | `Invalid date format` |

```js
getDayOfWeek('invalid-date');
// Error: Invalid date format
```

---

## getTimestampDayDiff

**概要**：2つのタイムスタンプ（ミリ秒）の差分を日単位で計算し、端数がある場合は切り上げた日数を返す。

**シグネチャ**

```js
getTimestampDayDiff(timestamp1, timestamp2)
```

**パラメータ**

| パラメータ名 | 型 | 必須 | 説明 |
|---|---|---|---|
| `timestamp1` | `number` | ✅ | 比較する1つ目の Unix タイムスタンプ（ミリ秒）。 |
| `timestamp2` | `number` | ✅ | 比較する2つ目の Unix タイムスタンプ（ミリ秒）。 |

**戻り値** `number`

| 値 | 型 | 説明 |
|---|---|---|
| 差分日数 | number | 2つのタイムスタンプの差分日数。差分が 0 でなければ端数を切り上げる。 |

**使用例**

```js
const { getTimestampDayDiff } = require('./tools/dateTool');

// ちょうど2日
const dayDiff1 = getTimestampDayDiff(
	new Date('2026-04-01T00:00:00Z').getTime(),
	new Date('2026-04-03T00:00:00Z').getTime()
);
console.log(dayDiff1); // 2

// 1.9日 -> 切り上げで2日
const dayDiff2 = getTimestampDayDiff(0, Math.floor(1.9 * 24 * 60 * 60 * 1000));
console.log(dayDiff2); // 2
```

**エラー**

| 条件 | エラーメッセージ |
|---|---|
| タイムスタンプが数値ではない、または有限数でない場合 | `Invalid timestamp` |

```js
getTimestampDayDiff('not-a-number', Date.now());
// Error: Invalid timestamp
```
