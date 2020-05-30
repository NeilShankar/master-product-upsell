const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const ApplyNewRecommendation = async (ctx) => {
    async function prods() {
        const bundle = await bundleModel.findById(ctx.request.body.bundleId)

        const update = await bundleModel.findByIdAndUpdate(ctx.request.body.bundleId, {$set:{
            "RecommendedProduct":{
                "Id": bundle.NewRecommendedProduct.Id,
                "Title": bundle.NewRecommendedProduct.Title,
                "ImageSrc": bundle.NewRecommendedProduct.ImageSrc
            }
        }})
        return update
    }

    ctx.response.body = await prods()

}

module.exports = ApplyNewRecommendation