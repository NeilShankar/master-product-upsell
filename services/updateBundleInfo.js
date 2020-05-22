const mongoose = require("mongoose");
const getThemes = require('../templates/default')

require("../models/store");
const storeModel = mongoose.model("Store");

const updateBundleInfo = async (ctx) => {
    var shop = `https://${ctx.session.shop}`
    var CurrentTheme = ctx.request.body.Theme
    var UpdateTheme = false
    var NewTheme = 0
    var Update = false
    var accessT = 0

    var ThemeToChange = "default"

    storeModel.findOne({ "url": shop }, (err,data) => {
        if (data.BundleConfigs.Theme != CurrentTheme) {
            UpdateTheme = true
            NewTheme = ctx.request.body.Theme
            accessT = data.accessToken
            if (NewTheme == 10) {
                ThemeToChange = "default"
            }
        }
        
        if (data.BundleConfigs.Title !== ctx.request.body.Title) {
            Update = true
        }
    })

    console.log("Going to Update.")
    
      
    storeModel.findOneAndUpdate({ "url": shop }, {$set:{"BundleConfigs.Title": ctx.request.body.Title, "BundleConfigs.Theme": ctx.request.body.Theme}}, {new: true}, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log("Updated")
    })
      
    

    ctx.res.statusCode = 200;
    ctx.body = "Updated"
}

module.exports = updateBundleInfo