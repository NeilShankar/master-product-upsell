const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    SourceProduct: String,
    RecommendedProduct: String,
    NewRecommendedProduct: String,
    SelectedProduct: String,
    Discount: Number
})


const Bundle = mongoose.model('Bundle', schema)

module.exports = {Bundle, schema}