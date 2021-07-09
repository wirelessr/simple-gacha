'use strict'
const rand = require("../");
const assert = require('chai').assert;
const factory = new rand.RandFactory();

describe('test amount', () => {
    it('basic', () => {
        let amount = factory.createRand("amount", [
            {"v": 1, "k": "hi"},
            {"v": 3, "k": "hello"}
        ]);
        assert.lengthOf(amount.rand(3), 3);
    });
    it('exceed length', () => {
        let amount = factory.createRand("amount", [
            {"v": 1, "k": "hi"},
            {"v": 3, "k": "hello"}
        ]);
        assert.throws(() => amount.rand(5), Error);
    });
    it('invalid input', () => {
        assert.throws(() => factory.createRand("amount", [
            { "k": "123", "v": 0.01 }
        ]), Error);
    });
});

describe('test probability', () => {
    it('basic', () => {
        let prob = factory.createRand("probability", [
            {"v": 50, "k": "hi"},
            {"v": 50, "k": "hello"}
        ]);
        assert.lengthOf(prob.rand(3), 3);

        const result = prob.rand(100);
        assert.include(result, "hi");
        assert.include(result, "hello");
    });
    it('invalid input', () => {
        assert.doesNotThrow(() => factory.createRand("probability", [
            { "k": "123", "v": 0.01 }
        ]), Error);
        assert.throws(() => factory.createRand("probability", [
            { "k": "123", "v": -0.01 }
        ]), Error);
        assert.throws(() => factory.createRand("probability", [
            { "k": "123", "v": 1000 }
        ]), Error);
    });
    it('min unit', () => {
        let prob = factory.createRand("probability", [
            {"v": 0.01, "k": "hi"}, // 0.01%
            {"v": 99.99, "k": "hello"} // 99.99% 
        ]);
        const result = prob.rand(100, 0.1); // minUnit: 0.1%
        assert.notInclude(result, "hi", "'hi' should be 0%");
    });
    it('append null check', () => {
        let prob = factory.createRand("probability", [
            {"v": 50, "k": "hi"}, // 50%, i.e., 50% is null
        ]);
        const result = prob.rand(100);
        assert.include(result, "hi");
        assert.include(result, null);
    });
});
