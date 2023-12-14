const CartsService = require('../repository/cartsRepository');

class CartsController {
  constructor() {
    this.service = new CartsService()
  }

  async getCarts(req, res) {
    try {
      const carts = await this.service.getCarts()
      res.json(carts)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async getCartById(req, res) {
    const { id } = req.params
    try {
      const cart = await this.service.getCartById(id)
      if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' })
      } else {
        res.json(cart)
      }
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async addCart(req, res) {
    try {
      const cart = await this.service.addCart()
      res.status(201).json(cart)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async addProductCart(req, res) {
    const { id, pid, quantity } = req.params
    try {
      const cart = await this.service.addProductCart(id, pid, quantity)
      res.json(cart)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async updateCart(req, res) {
    const { id } = req.params
    const { body } = req
    try {
      const updatedCart = await this.service.updateCart(id, body);
      res.json(updatedCart)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async updateCartProduct(req, res) {
    const { id, pid } = req.params
    const { body } = req
    try {
      const updatedProduct = await this.service.updateCartProduct(id, pid, body)
      res.json(updatedProduct)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async updateCartProducts(req, res) {
    const { id } = req.params
    const { body } = req
    try {
      const updatedProducts = await this.service.updateCartProducts(id, body)
      res.json(updatedProducts)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async deleteCart(req, res) {
    const { id } = req.params
    try {
      await this.service.deleteCart(id)
      res.json({ message: 'Carrito eliminado correctamente' })
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async deleteCartProduct(req, res) {
    const { id, pid } = req.params
    try {
      const cart = await this.service.deleteCartProduct(id, pid)
      res.json(cart)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }

  async deleteCartProducts(req, res) {
    const { id } = req.params
    try {
      const cart = await this.service.deleteCartProducts(id)
      res.json(cart)
    } catch (error) {
      res.status(500).json({ 
        error: error.message
     })
    }
  }
}

module.exports = CartsController;
