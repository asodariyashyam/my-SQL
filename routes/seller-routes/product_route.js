const express = require("express");
const routes = express.Router();
const productCtl = require("../../controller/seller/productCtl");
const verifyToken = require("../../utils/verifyToken");
const validation = require("../../utils/validation");


routes.get("/insertproduct",  productCtl.insertProductGet);

routes.post(
  "/insertproduct",verifyToken,
  validation.insertproductValidator,
  productCtl.insetproduct
);

routes.get("/fetchedata", verifyToken, productCtl.fetchedata);

routes.get("/detelproduct", verifyToken, productCtl.detelproduct);


routes.put(
  "/updateproduct/:id",
  verifyToken,
  validation.updateproductValidator,
  productCtl.updateProduct
);



module.exports = routes;
