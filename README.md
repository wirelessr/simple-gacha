# simple-gacha-factory
![ci](https://github.com/wirelessr/simple-gacha/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/wirelessr/simple-gacha/badge.svg?branch=main)](https://coveralls.io/github/wirelessr/simple-gacha?branch=main)

[![NPM](https://nodei.co/npm/simple-gacha-factory.png)](https://npmjs.org/package/simple-gacha-factory)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is a flexible factory that can pick out random objects by serveral simple algorithms.  
There are two methods on v1.0.0:
1. amount: Select by setting the total number in a similar way as through the weight.
2. probability: Select purely by chance

## Example

Basic usages are already included in the test cases:

```javascript
const factory = new rand.RandFactory();

const amount = factory.createRand("amount", {
  "hi": 1,
  "hello": 3,
});

const r1 = amount.rand(3);

// hi: 10%, hello: 30%, null: 60%
const prob = factory.createRand("probability", {
  "hi": 10,
  "hello": 30,
});

const r2 = prob.rand(3);
```

## Release Note

- v1.0.0: Release two method: amount and probability
- v1.0.2: Release README
- v2.0.0: Simplify input

## Contributing
Contributes are very welcome.
