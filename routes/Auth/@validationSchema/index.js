const Joi = require("joi");

const authSchema = Joi.object({
    LoginId : Joi.string().trim().min(4).max(10).required(),
    password : Joi.string().trim().min(8).max(15).required()
});

module.exports = { authSchema };