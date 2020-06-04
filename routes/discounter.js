const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

var randomstring = require("randomstring");

const generateDiscount = async (ctx) => {
    async function genDiscount() {
        const CartArray = ctx.request.body       

        const store = await storeModel.findOne({ domain: ctx.accept.headers.origin })

        // Some maths.

        var bundleIds = await store.Bundles

        let TotalPriceArr = []
        let DiscountedPriceArr = []
        let ApplyTo = []

        CartArray.forEach(cartItem => {
            TotalPriceArr.push(cartItem.TotalPrice)
            DiscountedPriceArr.push(cartItem.DiscountPrice)
            ApplyTo.push(cartItem.SourceVariant)
            ApplyTo.push(cartItem.SelectVariant)
        });

        let TotalPriceSum = TotalPriceArr.reduce((a, b) => a + b, 0)
        let DiscountedPriceSum = DiscountedPriceArr.reduce((a, b) => a + b, 0)
        let Difference = TotalPriceSum - DiscountedPriceSum
        let DiscountPercent = Math.round((Difference / TotalPriceSum) * 100)

        var shopURL = ctx.accept.headers.origin
        let PriceRuleId = CartArray[CartArray.length - 1].PriceRuleId

        if (PriceRuleId === "NONE") {
            var priceRuleTitle = randomstring.generate()

            const data = JSON.stringify({
                "price_rule": {
                "title": "shopLee_"+priceRuleTitle,
                "target_type": "line_item",
                "target_selection": "entitled",
                "allocation_method": "across",
                "value_type": "percentage",
                "entitled_product_ids": ApplyTo,
                "value": "-"+DiscountPercent,
                "customer_selection": "all",
                "starts_at": new Date()
                }
            })

            const response = await fetch(`${shopURL}/admin/api/2020-04/price_rules.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Shopify-Access-Token": await store.accessToken,
                },
                body: data
            }).catch((err) => {
                console.log(err)
            })

            const responseJson = await response.json();
            PriceRuleId = responseJson.price_rule.id
        } else {
            const data = JSON.stringify({
                "price_rule": {
                    "id": PriceRuleId,
                    "entitled_product_ids": ApplyTo,
                    "value": "-"+DiscountPercent,
                    "allocation_method": "across"
                  }
            })

            const response = await fetch(`${shopURL}/admin/api/2020-04/price_rules/${PriceRuleId}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Shopify-Access-Token": await store.accessToken,
                },
                body: data
            }).catch((err) => {
                return err
            })

            const responseJson = await response.json();
            PriceRuleId = responseJson.price_rule.id
        }

        var discountTitle = randomstring.generate({
            charset: 'shoplee2020!)ABC'
        })

        const DiscountData = JSON.stringify({         
            "discount_code": {
                "code": "bundleDiscount_"+discountTitle
            }           
        })

        const discountRequest = await fetch(`${shopURL}/admin/api/2020-04/price_rules/${PriceRuleId}/discount_codes.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": await store.accessToken,
            },
            body: DiscountData
        })

        const DiscountResponseJson = await discountRequest.json();   

        const returnData = JSON.stringify({
            "discountCode": DiscountResponseJson.discount_code.code,
            "priceRuleId": PriceRuleId
        })

        return returnData
    }

    ctx.body = await genDiscount()
}

module.exports = generateDiscount