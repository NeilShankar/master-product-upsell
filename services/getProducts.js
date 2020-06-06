const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

const getProducts = async (ctx) => {

    const accessToken = ctx.session.accessToken
    const shop = ctx.session.shop
    
    async function getLivePrevData() {
        const store = await storeModel.findOne({ url: `https://${shop}` })

        const bundle = await bundleModel.findById(store.Bundles[0])

        const prodRes = await fetch(`https://${shop}/admin/api/2020-04/products.json?ids=${bundle.SourceProduct.Id},${bundle.SelectedProduct.Id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "X-Shopify-Access-Token": accessToken,
            }
        })
        
        const productsResponseJson = await prodRes.json();
        const products = await productsResponseJson.products

        const payload = {
            products,
            Discount: await bundle.Discount,
            currency: await store.Metrics.ThisMonth.Currency
        }

        return payload
    }

    ctx.body = await getLivePrevData()
}

module.exports = getProducts