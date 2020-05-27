const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const DiscountBundle = async (ctx) => {
    
    async function discount() {
        const discount = await bundleModel.findByIdAndUpdate(ctx.request.query.prod_id, {Discount: ctx.request.query.Discount }, (err, res) => {
            return res
        })
        return discount
    }

    ctx.response.body = await discount()

}

module.exports = DiscountBundle