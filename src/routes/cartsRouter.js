const express = require('express');
const CartsController = require('../controllers/cartsController');

const cartsController = new CartsController();
const cartsRouter = express.Router();

cartsRouter.get('/', cartsController.getCarts.bind(cartsController));
cartsRouter.get('/:id', cartsController.getCartById.bind(cartsController));
cartsRouter.post('/', cartsController.addCart.bind(cartsController));
cartsRouter.post('/:id/:pid/:quantity', cartsController.addProductCart.bind(cartsController));
cartsRouter.put('/:id', cartsController.updateCart.bind(cartsController));
cartsRouter.put('/:id/:pid', cartsController.updateCartProduct.bind(cartsController));
cartsRouter.put('/:id/products', cartsController.updateCartProducts.bind(cartsController));
cartsRouter.delete('/:id', cartsController.deleteCart.bind(cartsController));
cartsRouter.delete('/:id/:pid', cartsController.deleteCartProduct.bind(cartsController));
cartsRouter.delete('/:id/products', cartsController.deleteCartProducts.bind(cartsController));

module.exports = cartsRouter