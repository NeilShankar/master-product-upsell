const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");

const EnableUpdater = async (ctx) => {

    async function prods() {
        var update = await storeModel.findOneAndUpdate({ url: `https://${ctx.session.shop}`}, {$set:{"UpdatingEnabled": ctx.request.body.Enabled}})

        return update
    }

    ctx.response.body = await prods()
}

module.exports = EnableUpdater