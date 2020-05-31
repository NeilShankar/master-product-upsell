const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");

const EnabledBundles = async (ctx) => {

    async function prods() {
        var update = await storeModel.findOneAndUpdate({ url: `https://${ctx.session.shop}`}, {$set:{"BundleConfigs.Enabled": ctx.request.body.Enabled}})

        return update
    }

    ctx.response.body = await prods()
}

module.exports = EnabledBundles