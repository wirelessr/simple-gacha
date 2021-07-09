# simple-gacha-factory

[![Coverage Status](https://coveralls.io/repos/github/wirelessr/simple-gacha/badge.svg?branch=main)](https://coveralls.io/github/wirelessr/simple-gacha?branch=main)

This is a flexible factory that can pick out random objects by serveral simple algorithms.  
There are two methods on v1.0.0:
1. amount: Select by setting the total number in a similar way as through the weight.
2. probability: Select purely by chance

## Example

Basic usages are already included in the test cases:

```javascript
const factory = new rand.RandFactory();

const amount = factory.createRand("amount", [
  {"v": 1, "k": "hi"},
  {"v": 3, "k": "hello"}
]);

const result = amount.rand(3);
```

## Contributing
Contributes are very welcome.
