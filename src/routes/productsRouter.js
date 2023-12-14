const { Router } = require('express')
const ProductsController = require('../controllers/productsController')
const UserMiddleware = require('../middlewares/userMiddleware')

const productsController = new ProductsController()
const userMiddleware = new UserMiddleware()
const productsRouter = new Router()

productsRouter.get('/', 
 userMiddleware.isAuth.bind(userMiddleware), 
 productsController.getProducts.bind(productsController)
)

productsRouter.get('/:id',
 userMiddleware.isAuth.bind(userMiddleware), 
 productsController.getProductById.bind(productsController)
)

productsRouter.post('/', 
 userMiddleware.isAuth.bind(userMiddleware),
 userMiddleware.hasRole('ADMIN'),
 productsController.addProduct.bind(productsController)
)

productsRouter.put('/:id', 
 userMiddleware.isAuth.bind(userMiddleware), 
 userMiddleware.hasRole('ADMIN'),
 productsController.updateProduct.bind(productsController)
)

productsRouter.delete('/:id', 
 userMiddleware.isAuth.bind(userMiddleware),
 userMiddleware.hasRole('ADMIN'),
 productsController.deleteProduct.bind(productsController)
)

module.exports = productsRouter