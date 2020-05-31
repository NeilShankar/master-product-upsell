const mongoose = require("mongoose");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");

const EnabledBundles = async (ctx) => {

    async function prods() {
        var update = await storeModel.findOne({ url: `https://${ctx.session.shop}`})

        return update
    }

    ctx.response.body = await prods()
}

module.exports = EnabledBundles