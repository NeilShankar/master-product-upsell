const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");


require("../models/store");
const storeModel = mongoose.model("Store");

const ResetProducts = async (ctx) => {
    var shop = ctx.session.shop

    async function prods() {
       var ShopInfo = await storeModel.findOne({ url: `https://${shop}` })
       var bundleArray = []
       bundleArray = [...ShopInfo.Bundles]
       
       return bundleArray.forEach(async element => {
           var recommended = await bundleModel.findById(element)

           var updatedBundle = await bundleModel.findByIdAndUpdate(element, {$set: {"SelectedProduct": {
             "Id": recommended.RecommendedProduct.Id,
             "Title": recommended.RecommendedProduct.Title,
             "ImageSrc": recommended.RecommendedProduct.ImageSrc
           }}})

           return updatedBundle
       }); 
    }

    ctx.response.body = await prods()

}

module.exports = ResetProducts