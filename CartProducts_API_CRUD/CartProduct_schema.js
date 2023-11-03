import Joi from "joi";
import mongoose from "mongoose";

const cartProductSchema = mongoose.Schema({
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
  productSubTotal: {
    require: true,
    type: Number,
  },
  productQuantity: {
    require: true,
    type: Number,
  },
  productId: {
    require: true,
    type: String,
  },
  productPrice: {
    require: true,
    type: Number,
    minlength: 7,
    maxlength: 30000000,
  },
});

const CartProduct = mongoose.model("CartProduct", cartProductSchema);

const ValidateCartProduct = (product) => {
  const schema = Joi.object({
    productImage: Joi.string().min(7).max(250).required(),
    productName: Joi.string().min(3).max(18).required(),
    productSubTotal: Joi.number().required(),
    productQuantity: Joi.number().required(),
    productPrice: Joi.number().min(7).max(3000000).required(),
    productId:Joi.string()
  });
  return schema.validate(product);
};

export { CartProduct, ValidateCartProduct };
