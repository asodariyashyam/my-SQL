const express = require("express");
const routes = express.Router();
const adminCtl = require("../../controller/admin/adminCtl");

routes.get("/admindetelproduct", adminCtl.admindetelproduct);

routes.get("/sellerShowseller", adminCtl.sellerShowseller);

routes.get("/buyerShowseller", adminCtl.buyerShowseller);

routes.get("/adminShowseller", adminCtl.adminShowseller);

routes.get("/admindeteldata", adminCtl.admindeteldata);

module.exports = routes;
