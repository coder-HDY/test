# API ドキュメント — 全体目次

このドキュメントはプロジェクト内のすべてのユーティリティ関数の全体目次です。  
各関数名のリンクをクリックすると、詳細ドキュメントの該当箇所へジャンプします。

---

## 日付操作

1. [getCurrentDate](./tools/dateTool.md#getcurrentdate) — 今日の日付を取得する
2. [getDateDiff](./tools/dateTool.md#getdatediff) — 2つの日付の差分を計算する
3. [getDayOfWeek](./tools/dateTool.md#getdayofweek) — 指定した日付の曜日を判定する
4. [getTimestampDayDiff](./tools/dateTool.md#gettimestampdaydiff) — 2つのタイムスタンプの差分日数を計算する（切り上げ）

## 配列操作

1. [arrayIntersection](./tools/arrayTool.md#arrayintersection) — 2つの配列の交集合を取得する
2. [arrayUnion](./tools/arrayTool.md#arrayunion) — 2つの配列の和集合を取得する
3. [arrayDifference](./tools/arrayTool.md#arraydifference) — 2つの配列の差集合を取得する

## バリデーション

1. [validateEmail](./tools/validationTool.md#validateemail) — メールアドレスのフォーマットを検証する
2. [validateUsername](./tools/validationTool.md#validateusername) — ユーザー名の形式を検証する
3. [validatePassword](./tools/validationTool.md#validatepassword) — パスワード強度を検証する
4. [isEqualValue](./tools/validationTool.md#isequalvalue) — 2つの任意値が等しいかを判定する（オブジェクトは深い比較）
