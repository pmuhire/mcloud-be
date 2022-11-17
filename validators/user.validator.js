/* eslint-disable linebreak-style */
const Joi = require('joi');

const validateUserRegisteration = (body) => {
  const validUserRegisterSchema = Joi.object({
    firstName: Joi.string().max(100).min(2).required(),
    lastName: Joi.string().max(100).min(2).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().required()
  });
  return validUserRegisterSchema.validate(body);
};

const validateUserAuthenatication = (body) => {
  const validUserLoginSchema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().required()
  });
  return validUserLoginSchema.validate(body);
};

module.exports = { validateUserAuthenatication, validateUserRegisteration }