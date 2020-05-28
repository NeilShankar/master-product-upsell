const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");

const DiscountAllBundle = async (ctx) => {
    async function discount() {
        const bundleArray = await storeModel.findOne({ url: `https://${ctx.session.shop}` })

        const discount = await Promise.all(bundleArray.Bundles.map(async (bundle) => {
            return bundleModel.findByIdAndUpdate(bundle, {Discount: ctx.request.body.Discount}, (err, res) => {
                return res
            })
        }));

        return discount
    }

    ctx.response.body = await discount()

}

module.exports = DiscountAllBundle