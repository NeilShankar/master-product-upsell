const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");

const getBundleInfo = async (ctx) => {
    async function getInfo() {
        const store = await storeModel.findOne({ url: `https://${ctx.session.shop}` })

        const previewData = await store.BundleConfigs
        var key = "Enabled"
        delete previewData[key]

        return previewData
    }

    ctx.body = await getInfo()
}

module.exports = getBundleInfo