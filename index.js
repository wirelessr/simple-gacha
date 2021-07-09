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
    const itemSchema = Joi.array().items(Joi.object({
      k: Joi.string().required(),
      v: Joi.number().integer().positive().required()
    }));
    const {error} = itemSchema.validate(this.data);
    if (error) {
      throw new Error("Input is invalid");
    }
  }
  rand(t) {
    let allItem = [];
    this.data.forEach(obj => {
      for (let i = 0; i < obj.v; i++) {
        allItem.push(obj.k);
      }
    });

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
    const itemSchema = Joi.array().items(Joi.object({
      k: Joi.string().required(),
      v: Joi.number().positive().required()
    }));
    const {error} = itemSchema.validate(this.data);
    if (error) {
      throw new Error("Input is invalid");
    }

    const sum = this.data.map(e => e.v).reduce((a, b) => a + b);
    if (sum > 100) {
      throw new Error("Sum is over 100%");
    }
    if (sum < 100) {
      this.data.push({"k": null, "v": 100 - sum});
    }
  }
  rand(t, minUnit = 0.01) {
    let allItem = [];
    this.data.forEach(obj => {
      for (let i = 0; i < Math.floor(obj.v / minUnit); i++) {
        allItem.push(obj.k);
      }
    });

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
