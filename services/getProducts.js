const mongoose = require("mongoose");
const delay = require('delay');

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

const getProducts = async (ctx) => {
    var accessT = "NiL";
    var ShopURI = "";

    const shop = await storeModel.findOne({"url": `https://${ctx.session.shop}`}, async function (
        err,
        shopData
    ) {
        accessT = await shopData.accessToken
        ShopURI = await shopData.url
    });

    const response = await fetch(
        `https://${ctx.session.shop}/admin/api/2020-04/products.json?limit=2`,
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

    const pResponse = await fetch(
        `https://${ctx.session.shop}/admin/api/2020-04/shop.json`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessT,
            },
    }
    );



    const pResponseJson = await pResponse.json();
    var pResults = JSON.parse(JSON.stringify(pResponseJson));
    
    await delay(1500)

    var ProductTitle = await results.products[0]["title"]
    var ProductImage = await results.products[0]["image"]["src"]
    var ProductPrice = await results.products[0]["variants"][0]["price"] + ` ${await pResults.shop.enabled_presentment_currencies[0]}`
    var Product1Title = await results.products[1]["title"]
    var Product1Image = await results.products[1]["image"]["src"]
    var Product1Price = await results.products[1]["variants"][0]["price"] + ` ${await pResults.shop.enabled_presentment_currencies[0]}`
    var TotalPrice = Number(await results.products[1]["variants"][0]["price"]) + Number(await results.products[0]["variants"][0]["price"]) + ` ${await pResults.shop.enabled_presentment_currencies[0]}`

    const Payload = {
        ProductTitle: ProductTitle,
        ProductImage: ProductImage,
        ProductPrice: ProductPrice,
        Product1Title: Product1Title,
        Product1Image: Product1Image,
        Product1Price: Product1Price,
        TotalPrice: TotalPrice
    }; 

    ctx.body = JSON.parse(JSON.stringify(Payload))
}

module.exports = getProducts