const express = require("express");
const routes = express.Router();
const verifyToken = require("../utils/verifyToken");

routes.use("/api", require("./seller-routes/User_route"));

routes.use('/', require('./buyer_router/product_router'))

routes.use('/admin', verifyToken ,require('./admin-routes/admin'))

module.exports = routes;