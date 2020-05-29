const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const SelectProduct = async (ctx) => {
    async function prods() {
        var ProductInfo = {
            "SourceProd": ctx.request.body.SourceProduct,
            "SelectProd": ctx.request.body.SelectedProduct
        }

        var NewSelect = await bundleModel.findOne({ "SourceProduct.Id": ProductInfo.SelectProd })

        var NewUpdate = {
            "Id": NewSelect.SourceProduct.Id,
            "Title": NewSelect.SourceProduct.Title,
            "ImageSrc": NewSelect.SourceProduct.ImageSrc
        }

        var Update = await bundleModel.findOneAndUpdate({ "SourceProduct.Id": ProductInfo.SourceProd }, { $set: { "SelectedProduct": NewUpdate }}, {new: true})

        return Update
    }

    ctx.response.body = await prods()

}

module.exports = SelectProduct