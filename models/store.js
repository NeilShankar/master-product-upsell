const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
     url: String,
     accessToken: String,
     FreeShipEnabled: Boolean,
     FreeShippingThreshold: Number
});

const store = mongoose.model('Store', schema)

module.exports = {store, schema}