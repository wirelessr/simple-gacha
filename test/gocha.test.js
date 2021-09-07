"use strict";
const rand = require("../");
const assert = require("chai").assert;
const factory = new rand.RandFactory();

describe("test amount", () => {
  it("basic", () => {
    let amount = factory.createRand("amount", {
      "hi": 1,
      "hello": 3
    });
    assert.lengthOf(amount.rand(3), 3);
  });
  it("exceed length", () => {
    let amount = factory.createRand("amount", {
      "hi": 1,
      "hello": 3
    });
    assert.throws(() => amount.rand(5), Error);
  });
  it("invalid input", () => {
    assert.throws(
      () =>
        factory.createRand("amount", {
          "123": 0.01 // floating value
        }),
      Error
    );
    assert.throws(
      () =>
        factory.createRand("amount", {
          "": 1 // empty key
        }),
      Error
    );
  });
});

describe("test probability", () => {
  it("basic", () => {
    let prob = factory.createRand("probability", {
      "hi": 50,
      "hello": 50
    });
    assert.lengthOf(prob.rand(3), 3);

    const result = prob.rand(100);
    assert.include(result, "hi");
    assert.include(result, "hello");
  });
  it("invalid input", () => {
    assert.doesNotThrow(
      () =>
        factory.createRand("probability", {
          "123": 0.01
        }),
      Error
    );
    assert.throws(
      () =>
        factory.createRand("probability", {
          "123": -0.01 // negative value
        }),
      Error
    );
    assert.throws(
      () =>
        factory.createRand("probability", {
          "": 0.01 // empty key
        }),
      Error
    );
    assert.throws(
      () =>
        factory.createRand("probability", {
          "123": 1000 // exceed value
        }),
      Error
    );
  });
  it("min unit", () => {
    let prob = factory.createRand("probability", {
      "hi": 0.01, // 0.01%
      "hello": 99.99 // 99.99%
    });
    const result = prob.rand(100, 0.1); // minUnit: 0.1%
    assert.notInclude(result, "hi", "'hi' should be 0%");
  });
  it("append null check", () => {
    let prob = factory.createRand("probability", {
      "hi": 50 // 50%, i.e., 50% is null
    });
    const result = prob.rand(100);
    assert.include(result, "hi");
    assert.include(result, "");
  });
});
