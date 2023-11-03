import Joi from "joi";
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productImage: {
    require: true,
    type: String,
    minlength: 7,
    maxlength: 250,
  },

  productName: {
    require: true,
    type: String,
    minlength: 3,
    maxlength: 18,
  },

  productPrice: {
    require: true,
    type: Number,
    minlength: 7,
    maxlength: 300,
  },
});

const Product = mongoose.model("Product", productSchema);

const ValidateProduct = (product) => {
  const schema = Joi.object({
    productImage: Joi.string().min(7).max(250).required(),
    productName: Joi.string().min(3).max(18).required(),
    productPrice: Joi.number().min(7).max(3000000).required(),
  });
  return schema.validate(product);
};

export { Product, ValidateProduct };
