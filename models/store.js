const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
     url: String,
     accessToken: String,
     FreeShipEnabled: Boolean,
     FreeShippingThreshold: Number,
     BundleConfigs: {
          Title: String,
          Theme: Number
     },
     Metrics: {
          ThisMonth: {
               Sales: Number,
               AddToCarts: Number,
               Views: Number,
               Currency: String
          },
          LastMonth: {
               Sales: Number,
               AddToCarts: Number,
               Views: Number,
               Currency: String
          }
     },
     ShopInfo: {
          UserName: String,
          ShopName: String
     },
     Bundles: Array
});

const store = mongoose.model('Store', schema)

module.exports = {store, schema}