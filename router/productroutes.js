const express = require('express');
const { updateProduct, readProduct, readProducts, createProduct, deleteProduct } = require('../controller/product');

const productRouter = express.Router();

productRouter
  .post('/', createProduct)
  .get('/', readProducts)
  .get('/:id', readProduct)
  .patch('/:id', updateProduct)
  .delete('/:id', deleteProduct);

exports.productRoutes = productRouter;
