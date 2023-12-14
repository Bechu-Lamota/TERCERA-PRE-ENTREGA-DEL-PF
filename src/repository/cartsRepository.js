const CartMongoDAO = require('../dao/mongo/cartsMongoDAO')

class CartsService {
    constructor () {
        this.storage = new CartMongoDAO()
    }
    
    getCarts () {
        return this.storage.getCarts()
    }

    getCartById (id) {
        return this.storage.getCartById(id)
    }
    
    addCart () {
        return this.storage.addCart()
    }

    addProductCart (id, pid, body) {
        return this.storage.addProductCart(id, pid, body)
    }

    updateCart (id, body) {
        return this.storage.updateCart(id, body)
    }

    updateCartProduct (id) {
        return this.storage.updateCartProduct(id)
    }

    updateCartProducts (id, body) {
        return this.storage.updateCartProducts(id, body)
    }

    deleteCart (id) {
        return this.storage.deleteCart(id)
    }

    deleteCartProduct (id, pid) {
        return this.storage.deleteCartProduct(id, pid)
    }

    deleteCartProducts (id) {
        return this.storage.deleteCartProducts(id)
    }


}

module.exports = CartsService