const mongoose = require("mongoose");

require("../models/store");
const storeModel = mongoose.model("Store");
require("isomorphic-fetch");

const FrequentProduct = async (ctx) => {
  var accessT = "NiL";
  var ShopURI = "";
  var FreeShipIsThere = false;
  var FreeShipping = 0;
  var ShopID = 0

  const shop = await storeModel.findById(ctx.params.id, function (
    err,
    shopData
  ) {
    accessT = shopData.accessToken;
    ShopURI = shopData.url;
    ShopID = shopData._id
    if (shopData.FreeShipEnabled === true) {
      FreeShipIsThere = true;
      FreeShipping = shopData.FreeShippingThreshold;
    }
  });

  const cID = ctx.request.body.collectionID;
  const pID = ctx.request.body.productID;
  const cSize = ctx.request.body.collectionSize;
  const sUrl = ctx.request.body.Shop;

  function collectRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const FbTproduct = collectRandom(0, cSize);

  const response = await fetch(
    `https://${sUrl}/admin/api/2020-04/collections/${cID}/products.json`,
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

  const product2 = results["products"][FbTproduct];

  if (product2["id"] === pID) {
    if (FbTproduct < cSize) {
      FbTproduct + 1;
    } else {
      FbTproduct - 1;
    }
  }

  const product3 = results["products"][FbTproduct];

  const pResponse = await fetch(
    `https://${sUrl}/admin/api/2020-04/products/${product3["id"]}.json?fields=id,image,title,handle,variant`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessT,
      },
    }
  );

  const pResponseJson = await pResponse.json();

  const vResponse = await fetch(
    `${ShopURI}/admin/api/2020-04/products/${product3["id"]}/variants.json`,
    {
      method: "GET",
      limit: 1,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessT,
      },
    }
  );

  const vResponseJson = await vResponse.json();

  const Payload = {
    ID: pResponseJson.product.id,
    FoundProductName: pResponseJson.product.title,
    FoundProductUrl: `${ShopURI}/products/${pResponseJson.product.handle}`,
    FoundImageUrl: pResponseJson.product["image"].src,
    FoundVariantID: vResponseJson.variants[0]["id"],
    Price: vResponseJson.variants[0]["price"],
    PageTitle: "Frequently Bought Together",
    FreeShipEnable: FreeShipIsThere,
    FreeShippingThres: FreeShipping,
  }; 

  ctx.body = JSON.parse(JSON.stringify(Payload));
};

module.exports = FrequentProduct;
