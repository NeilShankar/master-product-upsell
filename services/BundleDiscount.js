const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const DiscountBundle = async (ctx) => {
    async function discount() {
        const discount = await bundleModel.findByIdAndUpdate(ctx.request.body.prod_id, {Discount: ctx.request.body.Discount })
        return discount
    }

    ctx.response.body = await discount()

}

module.exports = DiscountBundle