const mongoose = require('mongoose')
require("isomorphic-fetch");


require("../models/bundles");
const bundleModel = mongoose.model("Bundle");

require("../models/store");
const storeModel = mongoose.model("Store");

const stopcock = require('stopcock')

async function UpdateRecommendedProducts(url) {
    var shopURL = `${url}`

    // First we get the StoreModel
    const store = await storeModel.findOne({ url: `https://${shopURL}` })

    var bundleArr = []

    // Then We get the Bundles
    const bundles = await Promise.all(store.Bundles.map(async (bundle) => {
        await bundleModel.findById(bundle, async (err, res) => {
            // Saved to Array
            bundleArr.push(res)
        })
    }));

    // Find Match Function
    async function FindMatch(current) {
        if (current.ChoosenBy === "Collection") {
            const productCollection = await fetch(`https://${shopURL}/admin/api/2020-04/collections/${current.RelateID}/products.json?fields=id,image,title`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  "X-Shopify-Access-Token": store.accessToken,
                }
              })
            
              const responseJson = await productCollection.json();

              function collectRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
              }

              const FbTproduct = collectRandom(0, responseJson.products.length);

              const NewRecommended = responseJson.products[FbTproduct]

              var ImageSrc = ""

                if (NewRecommended["image"] != null) { 
                    ImageSrc = NewRecommended["image"]["src"] 
                } else {
                    ImageSrc = "https://cynthiarenee.com/wp-content/uploads/2018/11/placeholder-product-image.png"
                }

              await bundleModel.findByIdAndUpdate(current._id, {$set: {
                  "NewRecommendedProduct":{
                    "Id": NewRecommended.id,
                    "Title": NewRecommended.title,
                    "ImageSrc": ImageSrc
                  }                 
              }})

            return "Choosen By Collection"
        } else if (current.ChoosenBy === "Type") {
            const SimilarProds = await fetch(`https://${shopURL}/admin/api/2020-04/products.json?product_type=${current.RelateID}&fields=id,image,title`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": store.accessToken,
                }
            })
    
            const SimProdsJson = await SimilarProds.json();

            function collectRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            const FbTproduct = collectRandom(0, SimProdsJson.products.length);

            const NewRecommended = SimProdsJson.products[FbTproduct]

            var ImageSrc = ""

            if (NewRecommended["image"] != null) { 
                ImageSrc = NewRecommended["image"]["src"] 
            } else {
                ImageSrc = "https://cynthiarenee.com/wp-content/uploads/2018/11/placeholder-product-image.png"
            }

            await bundleModel.findByIdAndUpdate(current._id, {$set: {
                "NewRecommendedProduct":{
                  "Id": NewRecommended.id,
                  "Title": NewRecommended.title,
                  "ImageSrc": ImageSrc
                }                 
            }})

            return "Choosen By Type"
        } else {
            return "NoN"
        }
    }

    // Rate Limiting Stuff
    const findBundlesMatching = stopcock(FindMatch, { bucketSize: 1, interval: 1000 });

    bundleMatch()

    // Main Function
    function bundleMatch() {
        console.log("Started Daily Updater")
        bundleArr.forEach(element => {
            findBundlesMatching(element).then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
        });
    }
}

module.exports = UpdateRecommendedProducts