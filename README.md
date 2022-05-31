# ts-option

[![license](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue")](LICENSE-MIT)
[![docs](https://img.shields.io/badge/docs-typescript-blue.svg)](https://aicacia.github.io/ts-option/)
[![npm (scoped)](https://img.shields.io/npm/v/@aicacia/option)](https://www.npmjs.com/package/@aicacia/option)
[![build](https://github.com/aicacia/ts-option/workflows/Test/badge.svg)](https://github.com/aicacia/ts-option/actions?query=workflow%3ATest)

aicacia option

```ts
import { Option, none } from "@aicacia/option";

const maybe = none<number>();

if (maybe.isNone()) {
  maybe.replace(1);
}

console.log(maybe.unwrap()); // 1
```
