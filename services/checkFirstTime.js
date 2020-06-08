const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");

const checkFirstTime = async (ctx) => {

    async function prods() {
        var store = await storeModel.findOne({ url: `https://${ctx.session.shop}`})

        if (store.ServiceEnabled === true) {
            return false
        } else {
            return true
        }
    }

    ctx.response.body = await prods()
}

module.exports = checkFirstTime