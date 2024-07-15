const Validator = require('validatorjs');

const validate = (data, rules, customMessages = {}) => {
     const validation = new Validator(data, rules, customMessages);
     return {
          passes: validation.passes(),
          errors: validation.errors.all()
     }
}

module.exports = validate;