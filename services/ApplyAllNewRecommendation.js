const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");

const ApplyAllNewRecommendation = async (ctx) => {
    async function prods() {
        const store = await storeModel.findOne({ url: `https://${ctx.session.shop}` })

        var bundleArray = []
        var bundleArray = [...store.Bundles]

        var bunArr = []

        const bundlesFind = await Promise.all(bundleArray.map(async (bundle) => {
            return bundleModel.findById(bundle, (err, res) => {
                bunArr.push(res)
            })
        }))

        const update = await Promise.all(bunArr.map(async (bundle) => {
            if (bundle.NewRecommendedProduct.Id !== bundle.RecommendedProduct.Id && bundle.NewRecommendedProduct.Id !== "None") {
                return bundleModel.findByIdAndUpdate(bundle, {"RecommendedProduct": bundle.NewRecommendedProduct}, (err, res) => {
                    return res
                })
            }
        }));


        return update
    }

    ctx.response.body = await prods()

}

module.exports = ApplyAllNewRecommendation