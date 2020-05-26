const mongoose = require("mongoose");
const delay = require("delay")
const { promisify } = require('util')
const sleep = promisify(setTimeout)


require("../models/store");
const storeModel = mongoose.model("Store");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

const stopcock = require('stopcock');

require("isomorphic-fetch");

const getAllBundles = async (ctx) => {
    
    async function getBundles() {
        const store = await storeModel.findOne({ url: `https://${ctx.session.shop}` })
        const bundles = await Promise.all(store.Bundles.map(async (bundle) => {
            return bundleModel.findById(bundle, (err, res) => {
                return res
            })
        }));


        return bundles
    }

    ctx.response.body = await getBundles()

}

module.exports = getAllBundles