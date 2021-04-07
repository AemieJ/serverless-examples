const Joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(256).required()
    });
    return schema.validate(data);
};

module.exports = registerValidation

