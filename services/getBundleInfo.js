const mongoose = require("mongoose");
const delay = require('delay');

require("../models/store");
const storeModel = mongoose.model("Store");

const getBundleInfo = async (ctx) => {
    var shop = `https://${ctx.session.shop}`
    var Title = ""
    var Theme = 0

    storeModel.findOne({ "url": shop }, async (err, data) => {
       if (err) {
           console.log(err)
       } else {
           Title = await data.BundleConfigs.Title
           Theme = await data.BundleConfigs.Theme
       }
    })
    
    await delay(2000)
    ctx.body = {"Title": Title, "Theme": Theme}
}

module.exports = getBundleInfo