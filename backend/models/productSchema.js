import { Schema, model } from "mongoose";

import Joi from "joi";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
  },

  urls: {
    type: Array,
    required: false,
    default: [],
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Products = model("product", productSchema);

export const validateProduct = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required(),
    oldPrice: Joi.number(),
    info: Joi.string(),
    category: Joi.string().required(),
    rating: Joi.number().required(),
    available: Joi.boolean(),
    stock: Joi.number().required(),
    userId: Joi.string(),
    urls: Joi.array(),
  });
  return schema.validate(body);
};
