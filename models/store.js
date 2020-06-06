const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
     url: String,
     domain: String,
     accessToken: String,
     FreeShipEnabled: Boolean,
     FreeShippingThreshold: Number,
     BundleConfigs: {
          title: String,
          titleColor: String,
          buttonText: String,
          buttonBackground: String,
          buttonTextColor: String,
          buttonBorderColor: String,
          buttonHoverBackground: String,
          buttonHoverTextColor: String,
          buttonHoverBorderColor: String,
          Enabled: Boolean
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
     Bundles: Array,
     JobInfo: String
});

const store = mongoose.model('Store', schema)

module.exports = {store, schema}