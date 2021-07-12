'use strict'
const Joi = require("joi");

class Rand {
  rand(t) {
    throw new Error("NotImplemented");
  }
  validate(data) {
    throw new Error("NotImplemented");
  }
}

class AmountRand extends Rand {
  constructor(data) {
    super();
    this.data = data;
    this.validate();
  }
  validate() {
    const itemSchema = Joi.object().pattern(Joi.string().min(1), Joi.number().integer().positive());
    const {error} = itemSchema.validate(this.data);
    if (error) {
      throw new Error("Input is invalid");
    }
  }
  rand(t) {
    let allItem = [];
    for (const k in this.data) {
      for (let i = 0; i < this.data[k]; i++) {
        allItem.push(k);
      }
    }

    if (t > allItem.length) {
        throw new Error("Length is overflow");
    }

    let result = [];
    for (let i = 0; i < t; i++) {
      let index = Math.floor(Math.random() * allItem.length);
      result.push(allItem[index]);
      allItem.splice(index, 1);
    }
    return result;
  }
}

class ProabilityRand extends Rand {
  constructor(data) {
    super();
    this.data = data;
    this.validate();
  }
  validate() {
    const itemSchema = Joi.object().pattern(Joi.string().min(1), Joi.number().positive());
    const {error} = itemSchema.validate(this.data);
    if (error) {
      throw new Error("Input is invalid");
    }

    let sum = 0;
    for (const k in this.data) {
      sum += this.data[k];
    }
    if (sum > 100) {
      throw new Error("Sum is over 100%");
    }
    if (sum < 100) {
      this.data[""] = 100 - sum;
    }
  }
  rand(t, minUnit = 0.01) {
    let allItem = [];
    for (const k in this.data) {
      for (let i = 0; i < Math.floor(this.data[k] / minUnit); i++) {
        allItem.push(k);
      }
    }

    let result = [];
    for (let i = 0; i < t; i++) {
      let index = Math.floor(Math.random() * allItem.length);
      result.push(allItem[index]);
    }
    return result;
  }
}

class RandFactory {
  createRand(t, data) {
    if (t == 'amount') return new AmountRand(data);
    if (t == 'probability') return new ProabilityRand(data);
  }
}

module.exports.RandFactory = RandFactory;
