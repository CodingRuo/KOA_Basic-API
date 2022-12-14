const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string(),
  company: Joi.string(),
  position: Joi.string(),
  phoneNumber: Joi.number().required(),
});

const ALLOWED_METHODS = ["PUT", "POST"];

module.exports = () => {
  return async (ctx, next) => {
    const { methods } = ctx;
    const { body } = ctx.request;

    if (ALLOWED_METHODS.includes(methods)) {
      const { error } = Joi.validate(body, schema);

      if (error) {
        ctx.status = 422;
        ctx.body = {
          status: "error",
          message: "validation error",
          errors: error.details.map((e) => e.message),
        };
      } else {
        await next();
      }
    } else {
      await next();
    }
  };
};
