import express from "express";
import { CartProduct, ValidateCartProduct } from "./CartProduct_schema.js";

const cartProductRouter = express.Router();

cartProductRouter.post("/api/CartProduct", async (req, res) => {
  const {error,value}=ValidateCartProduct(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  let cartProduct = new CartProduct({
    productImage: req.body.productImage,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productSubTotal: req.body.productSubTotal,
    productQuantity: req.body.productQuantity,
  });
  const result = await cartProduct.save();
  return res.send(result);
});

cartProductRouter.get("/api/CartProduct", async (req, res) => {
  const result = await CartProduct.find();
  res.send(result);
});
cartProductRouter.put("/api/CartProduct/:id", async (req, res) => {
  const result = await CartProduct.findByIdAndUpdate(req.params.id, {
    productImage: req.body.productImage,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productSubTotal: req.body.productSubTotal,
    productQuantity: req.body.productQuantity,
  });

  res.send(result);
});
cartProductRouter.delete("/api/CartProduct/:id", async (req, res) => {
  const result = await CartProduct.findByIdAndRemove(req.params.id);
  if (!result) res.status(404).send("Not Find This id");
  res.send(result);
});

export default cartProductRouter;
