import Joi from "joi";

const skuPattern = /^[A-Z]{3}\d{4}$/;

export const productSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().min(2).max(80).required(),
      sku: Joi.string().pattern(skuPattern).required(),
      quantity: Joi.number().integer().min(0).required(),
      price: Joi.number().positive().precision(2).required(),
      category: Joi.string()
        .valid("electronics", "clothing", "food", "tools", "other")
        .required(),
    }),
  },

  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(2).max(80).optional(),
      quantity: Joi.number().integer().min(0).optional(),
      price: Joi.number().positive().precision(2).optional(),
      category: Joi.string()
        .valid("electronics", "clothing", "food", "tools", "other")
        .optional(),
    }).min(1),
  },

  idParam: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};