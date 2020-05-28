const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const SelectProduct = async (ctx) => {
    async function prods() {
        var ProductInfo = {
            "SourceProd": ctx.request.body.SourceProduct,
            "SelectProd": ctx.request.body.SelectedProduct
        }

        return ProductInfo
    }

    ctx.response.body = await prods()

}

module.exports = SelectProduct