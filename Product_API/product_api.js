import express from "express";
import { Product, ValidateProduct } from "./product_schema.js";
const productRouter = express.Router();

productRouter.post("/api/Product", async (req, res) => {
  const { error, value } = ValidateProduct(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let product = new Product({
    productImage: value.productImage,
    productName: value.productName,
    productPrice: value.productPrice,
  });

  const result = await product.save();

  return res.send(result);
});

productRouter.get("/api/Product", async (req, res) => {
  const result = await Product.find();

  res.send(result);
});

productRouter.put("/api/Product/:id", async (req, res) => {
  const result = await Product.findByIdAndUpdate(req.params.id, {
    productImage: req.body.productImage,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
  });

  res.send(result);
});

productRouter.delete("/api/Product/:id", async (req,res) => {
  const result = await Product.findByIdAndRemove(req.params.id);
  if (!result) res.status(404).send("Not Find This id");
  res.send(result);
});

export default productRouter;
