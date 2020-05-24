const mongoose = require("mongoose");
const delay = require('delay');

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

const getShopInfo = async (ctx) => {
    var shopURL = `https://${ctx.session.shop}`
    var accessT = ""
    var ShopUser = ""
    var ShopName = ""

    storeModel.findOne({ "url": shopURL }, async (err, res) => {
        accessT = await res.accessToken
        ShopUser = await res.ShopInfo.UserName
        ShopName = await res.ShopInfo.ShopName
    })

    await delay(2000)

    const Payload = {
        User: ShopUser,
        Shop: ShopName
    }

    ctx.body = JSON.parse(JSON.stringify(Payload))
}

module.exports = getShopInfo