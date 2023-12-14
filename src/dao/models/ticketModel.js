const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now()
    },
    amount: Number,
    purchaser: String
})
module.exports = mongoose.model('tickets', ticketSchema)