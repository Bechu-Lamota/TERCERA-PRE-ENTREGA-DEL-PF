const ProductsService = require('../repository/productsRepository')

class ProductsController {
    constructor (io) {
        this.service = new ProductsService()
        this.io = io
    }

    async getProducts(req, res) {
        try {
          const { limit } = req.query || 10
          const { page } = req.query || 1
          const products = await this.service.getProducts( limit, page )
          
          if (!products) {
            return res.status(404).json({
              error: 'No se encontraron productos'
            })
          }

          return res.json(products)
          return res.render('products', { products });
        } catch (error) {
            return res.status(500).json({error: 'Error interno del servidor' })
        }
    }

    async getProductById (req, res) {
      try {
        const { id } = req.params
        const product = await this.service.getProductsById(id)
    
        if (!product) {
          return res.status(404).json({
            error: 'Producto no encontrado'
          })
        }
    
        return res.status(200).json('Success')
      } catch (error) {
        res.status(500).json({ error: 'ID no encontrado' })
      }
    }
    
    async addProduct (req, res) {
      try{
        const { body } = req
        const newProduct = await this.service.addProduct(body)
    
        if (!newProduct) {
          return res.status(500).json({
            error: 'No se pudo crear el producto'
          })
        }

        this.io.emit('body', JSON.stringify(newProduct))
        return res.status(201).json(newProduct)
      } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'No se pudo agregar producto' })
      }

    }
    
    async updateProduct (req, res) {
      try{
        const { id } = req.params
        const { body } = req
        const updatedProduct = await this.service.updateProduct(id, body)
    
        if (!updatedProduct) {
          return res.status(500).json({
            error: 'No se pudo actualizar el producto'
          })
        }
    
        return res.json(updatedProduct)
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ 
          error: 'No se pudo actualizar producto' 
        })
      }
    }
    
    async deleteProduct (req, res) {
      try {
        const { id } = req.params
        const deletedProduct = await this.service.deleteProduct(id)
    
        if (!deletedProduct) {
          return res.status(500).json({
            error: 'No se pudo borrar el producto'
          })
        }
        
        return res.status(204).json({})
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ 
          error: 'No se pudo eliminar producto' 
        })
      }
      }
     }
     
module.exports = ProductsController