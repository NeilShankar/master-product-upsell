const mongoose = require("mongoose");
const delay = require('delay');
const getSymbolFromCurrency = require('currency-symbol-map')

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

const getMetrics = async (ctx) => {
    var shopURL = `https://${ctx.session.shop}`

    // This Month Analysis.
    var Sales = 0
    var Currency = ""
    var AddToCarts = 0
    var Impressions = 0
    var CurrencyCode = ""

    // Last Month Analysis
    var LMsales = 0
    var LMcarts = 0
    var LMviews = 0 
    // Some UI settings.
    var AddToCartColor = "green"
    var ViewsColor = "green"
    var SalesColor = "green"

    storeModel.findOne({ "url": shopURL }, async (err, res) => {
        Sales = await res.Metrics.ThisMonth.Sales
        AddToCarts = await res.Metrics.ThisMonth.AddToCarts
        Impressions = await res.Metrics.ThisMonth.Views
        Currency = await res.Metrics.ThisMonth.Currency
        LMsales = await res.Metrics.LastMonth.Sales
        LMcarts = await res.Metrics.LastMonth.AddToCarts
        LMviews = await res.Metrics.LastMonth.Views
    })

    await delay(2000)

    // Checking If Profit or Loss.
    if (Sales >= LMsales) {
        SalesColor = "#fff"
    } else {
        SalesColor = "#fff"
    }

    if (AddToCarts >= LMcarts) {
        AddToCartColor = "#fff"
    } else {
        AddToCartColor = "#fff"
    }

    if (Impressions >= LMviews) {
        ViewsColor = "#fff"
    } else if (Impressions < LMviews ) {
        ViewsColor = "#fff"
    }

    CurrencyCode = getSymbolFromCurrency(Currency)

    const Payload = {
        Sales: `${CurrencyCode}${Sales}`,
        AddToCart: AddToCarts,
        Views: Impressions,
        SalesColor: SalesColor,
        ViewsColor: ViewsColor,
        AddToCartColor: AddToCartColor
    }

    ctx.body = JSON.parse(JSON.stringify(Payload))
}

module.exports = getMetrics