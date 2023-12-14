const products = require('../models/productModel')
const ProductDAO = require('../productsDAO')

class ProductsMemory extends ProductDAO {
    async getProducts () {
      return await products.find()
    }
  
    async getProductById (id) {
      return await products.findById(id)
    }
  
    async addProduct (product) {
      return await products.create(product)
    }
  
    async updateProduct (id, body) {
      return await products.findByIdAndUpdate(id, body, { new: true })
    }
  
    async deleteProduct (id) {
      return await products.findByIdAndDelete(id)
    }
  
  }
  
  module.exports = ProductsMemory