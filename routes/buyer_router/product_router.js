const express = require("express");
const routes = express.Router();
const buyer_productCtl = require("../../controller/buyer/buyer_productCtl");
const verifyToken = require("../../utils/verifyToken")

routes.get("/", buyer_productCtl.getallproduct);

routes.get("/addproduct", buyer_productCtl.addproduct);

routes.post("/quantity",verifyToken, buyer_productCtl.quantity);

routes.get('/buyer_product',verifyToken,buyer_productCtl.buyer_product)

routes.get("/removecart", verifyToken,buyer_productCtl.removecart)

module.exports = routes;
