# Date & Array Utils

一个轻量的 Node.js 工具库，提供常见的日期处理与数组集合操作函数。

适用场景：
- 需要快速处理日期差值、星期计算等基础能力
- 需要对数组做交集、并集、差集等集合运算
- 希望用简单 API 快速复用工具函数

## Features

- 日期工具：获取当前日期、计算日期差值、判断星期
- 数组工具：交集、并集、差集
- 覆盖 Jest 测试用例，便于回归验证
- 提供日文 API 详细文档

## Installation

### 1. 克隆仓库

```bash
git clone https://github.com/coder-HDY/test.git
cd test
```

### 2. 安装依赖

```bash
npm install
```

## Quick Start

```js
const { getCurrentDate, getDateDiff, getDayOfWeek } = require('./tools/dateTool');
const { arrayIntersection, arrayUnion, arrayDifference } = require('./tools/arrayTool');

const now = getCurrentDate();
console.log(now);

const diff = getDateDiff('2026-04-01', '2026-04-05');
console.log(diff);

const weekday = getDayOfWeek('2026-04-01');
console.log(weekday);

console.log(arrayIntersection([1, 2, 3], [2, 3, 4]));
console.log(arrayUnion([1, 2], [2, 3]));
console.log(arrayDifference([1, 2, 3], [2]));
```

## API Overview

### Date Tools

- getCurrentDate(): 返回当前日期对象
- getDateDiff(date1, date2): 返回两日期之间的差值
- getDayOfWeek(date): 返回指定日期对应的星期信息

详细文档：
- docs/tools/dateTool.md

### Array Tools

- arrayIntersection(arr1, arr2): 返回两个数组交集
- arrayUnion(arr1, arr2): 返回两个数组并集
- arrayDifference(arr1, arr2): 返回 arr1 相对 arr2 的差集

详细文档：
- docs/tools/arrayTool.md

完整 API 目录：
- docs/README.md

## Available Scripts

- npm test: 运行全部测试
- npm run test:watch: 监听模式运行测试

## Project Structure

```text
.
├── docs/
│   ├── README.md
│   └── tools/
│       ├── arrayTool.md
│       └── dateTool.md
├── test/
│   └── tools/
│       ├── arrayTool.test.js
│       └── dateTools.test.js
├── tools/
│   ├── arrayTool.js
│   └── dateTool.js
├── package.json
└── README.md
```

## Contributing

欢迎提交 Issue 与 Pull Request。

推荐流程：
1. Fork 仓库并创建功能分支
2. 编写或更新测试
3. 确认 npm test 通过
4. 提交 PR 并说明变更目的

## License

ISC