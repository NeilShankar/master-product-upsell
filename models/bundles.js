const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    SourceProduct: {
        Id: String,
        Title: String,
        ImageSrc: String
    },
    RecommendedProduct: {
        Id: String,
        Title: String,
        ImageSrc: String
    },
    NewRecommendedProduct: {
        Id: String,
        Title: String,
        ImageSrc: String
    },
    SelectedProduct: {
        Id: String,
        Title: String,
        ImageSrc: String
    },
    Discount: Number
})


const Bundle = mongoose.model('Bundle', schema)

module.exports = {Bundle, schema}