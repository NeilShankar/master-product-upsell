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
    })

    await delay(2000)

    const response = await fetch(
        `https://${ctx.session.shop}/admin/api/2020-04/shop.json`,
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessT,
                },
            }
        );

    const responseJson = await response.json();
    var results = JSON.parse(JSON.stringify(responseJson));

    await delay(2000)

    ShopUser = results.shop.shop_owner
    ShopName = results.shop.name

    const Payload = {
        User: ShopUser,
        Shop: ShopName
    }

    ctx.body = JSON.parse(JSON.stringify(Payload))
}

module.exports = getShopInfo