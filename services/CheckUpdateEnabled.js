const mongoose = require("mongoose");
require("../models/store");
const storeModel = mongoose.model("Store");

const EnabledUpdating = async (ctx) => {

    async function prods() {
        var store = await storeModel.findOne({ url: `https://${ctx.session.shop}`})
        var checked = await store.UpdatingEnabled

        return checked
    }

    ctx.response.body = await prods()
}

module.exports = EnabledUpdating