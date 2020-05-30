const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const ApplyRecommendation = async (ctx) => {
    async function prods() {
        const bundle = await bundleModel.findById(ctx.request.body.bundleId)
        const update = await bundleModel.findByIdAndUpdate(ctx.request.body.bundleId, {$set:{
            "SelectedProduct":{
                "Id": bundle.RecommendedProduct.Id,
                "Title": bundle.RecommendedProduct.Title,
                "ImageSrc": bundle.RecommendedProduct.ImageSrc
            }
        }})
        return update
    }

    ctx.response.body = await prods()

}

module.exports = ApplyRecommendation