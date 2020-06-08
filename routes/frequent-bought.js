const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const postFrequentProduct = async (ctx) => {
  async function getBundle() {
    // Getting the Bundle Information.
    const bundleProduct = await bundleModel.findOne({ "SourceProduct.Id": ctx.params.id })
    const sourceProduct = await bundleProduct.SourceProduct
    const selectedProduct = await bundleProduct.SelectedProduct

    // Get some Tokens And Important Stuff.
    const store = await storeModel.findOne({ "Bundles": bundleProduct._id })
    const shop = `${store.url}`

    if (store.BundleConfigs.Enabled === false) {
      return ;
    }

    var impressions = await store.Metrics.ThisMonth.Views
    var newImpr = impressions + 1
    const updateStoreMetrics = await storeModel.findOneAndUpdate({ url: shop }, {$set: {"Metrics.ThisMonth.Views": newImpr}})
    
    const accessToken = await store.accessToken

    // Get Variants Of Products and Save to New Object.
    const productsInfo = await fetch(`${shop}/admin/api/2020-04/products.json?ids=${sourceProduct.Id},${selectedProduct.Id}&?fields=variants,handle`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "X-Shopify-Access-Token": accessToken,
      }
    })
  
    const productInfoJson = await productsInfo.json();
    productInfoJson.Discount = await bundleProduct.Discount
    productInfoJson.BundleId = await bundleProduct._id
    productInfoJson.BundleConfigs = await store.BundleConfigs

    return JSON.stringify(productInfoJson)
  }
  

  ctx.body = await getBundle()
};

module.exports = postFrequentProduct;
