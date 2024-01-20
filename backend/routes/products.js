const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');


const product = require("../controller/product");

router.route("/createproduct")
    .post(catchAsync(product.createProduct))


router.route("/getproduct/:id") 
    .get(catchAsync(product.getProduct))


router.route("/getallproducts/:warehouse_id")
    .get(catchAsync(product.getAllProducts))


router.route("/deleteproduct/:warehouse_id")
    .post(catchAsync(product.deleteProduct))

module.exports = router;