const mongoose = require("mongoose");
const getThemes = require('../templates/default')

require("../models/store");
const storeModel = mongoose.model("Store");

const updateBundleInfo = async (ctx) => {
    async function updateBundles() {
        const store = await storeModel.findOne({ url: `https://${ctx.session.shop}` })
        
        const updateObj = ctx.request.body.bundleConfigs
        updateObj["Enabled"] = await store.BundleConfigs.Enabled

        const update = await storeModel.findByIdAndUpdate(store._id, {$set: { BundleConfigs: updateObj }})

        return update
    }

    ctx.body = await updateBundles()
}

module.exports = updateBundleInfo