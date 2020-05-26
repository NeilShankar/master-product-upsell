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

const InitializeBundles = async (ctx) => {
    const products = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products.json?limit=250`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "X-Shopify-Access-Token": ctx.session.accessToken,
      }
    })
  
    const productsJson = await products.json();

    var sourceArray = []

    productsJson.products.forEach(element => {
        sourceArray.push(`${element.id}`)
    });

    async function request(i) {
        const collections = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/collects.json?product_id=${i}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ctx.session.accessToken,
            }
        })
  
        const collectionsJson = await collections.json();

        return collectionsJson
    }

var ReDo = []

    async function requestProductFromCollection(collection, prod) {
            const collectionOfProd = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/collections/${collection}/products.json`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ctx.session.accessToken,
            }
            })

            const collectionsJson = await collectionOfProd.json();

            function collectRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
            }
            const FbTproduct = collectRandom(0, collectionsJson.products.length);

            if (collectionsJson.products[FbTproduct].id === prod) {
            console.log("Found Conflict")
            if (FbTproduct <  collectionsJson.products.length) {
                FbTproduct = FbTproduct + 1
            } else {
                FbTproduct = FbTproduct - 1
            }
            } else {
            console.error()
            }

            var RecommendedProduct = collectionsJson.products[FbTproduct].id

            var Bundled = JSON.parse(JSON.stringify({
                "SourceProduct": prod,
                "RecommendedProduct": `${RecommendedProduct}`,
                "NewRecommendedProduct": "None",
                "SelectedProduct": `${RecommendedProduct}`,
                "Discount": 0
            }))
            return Bundled
    }

    async function requestProductFromType(prod) {
            const ProductType = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products/${prod}.json`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ctx.session.accessToken,
            }
            })
    
            const JsonPT = await ProductType.json();
            const type = JsonPT.product.product_type

            sleep(1000)

            const SimilarProds = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products.json?product_type=${type}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": ctx.session.accessToken,
                }
            })
    
            const SimProdsJson = await SimilarProds.json();

            function collectRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            const FbTproduct = collectRandom(0, SimProdsJson.products.length);

            var RecommendedProduct = SimProdsJson.products[FbTproduct].id

            if (SimProdsJson.products[FbTproduct].id === prod) {
                console.log("Found Conflict")
                if (FbTproduct <  SimProdsJson.products.length) {
                    FbTproduct = FbTproduct + 1
                    RecommendedProduct = SimProdsJson.products[FbTproduct].id
                } else if (SimProdsJson.products.length < 1) {
                    await sleep(1000)

                    console.log("No Same Types, so defining a random")
                    const Prods = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products.json`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    "X-Shopify-Access-Token": ctx.session.accessToken,
                    }
                    })

                    const ProdJson = await Prods.json();

                    RecommendedProduct = ProdJson.products[FbTproduct].id
                } else {
                    FbTproduct = FbTproduct - 1
                    RecommendedProduct = SimProdsJson.products[FbTproduct].id
                }
            } else {
                console.error()
            }


            var BundledFromType = JSON.parse(JSON.stringify({
                "SourceProduct": prod,
                "RecommendedProduct": `${RecommendedProduct}`,
                "NewRecommendedProduct": "None",
                "SelectedProduct": `${RecommendedProduct}`,
                "Discount": 0
            }))

            return BundledFromType
    }


    const get = stopcock(request, { bucketSize: 2, interval: 1000 });
    const getBundleFromCollection = stopcock(requestProductFromCollection, { bucketSize: 2, interval: 1000 });
    const getBundleFromType = stopcock(requestProductFromType, { bucketSize: 1, interval: 1000 });

    var TotalBundledArray = []
    var BundleIdArray = []

    async function createBundlesInDB() {
        try {
            bundleModel.insertMany(TotalBundledArray).then((res) => {
                console.log(res)
            })
        } catch (e) {
            console.log(e)
        }
    }

    var Complete = 0
    var Total = 0
    

    function Opertions() {
        ++Complete
        if (Complete === Total) {
            Complete = 0
            Total = 0
            if (ReDo.length) {
                Retry()
            } else {
                console.log("Completed With No Errors! Creating new records now.")
                console.log(TotalBundledArray)
                // createBundlesInDB()
            }            
        }
    }

    async function Retry() {
        console.log("Completed, But there are some errors, lets fix them...")
        sourceArray = ReDo.slice(0)
        ReDo = []
        await sleep(10000)
        FindBundles()
    }

function FindBundles() {
    sourceArray.forEach(function(i){
        Total = sourceArray.length
        console.log(i)
        get(i).then((log) => {
            if (Array.isArray(log.collects) && log.collects.length) {
                getBundleFromCollection(log.collects[0].collection_id, i).then((res) => {
                    if (typeof res === "undefined") {
                        ReDo.push(i)
                    } else {
                        TotalBundledArray.push(res)
                    }                    
                }).catch((e) => {
                    ReDo.push(i)
                }) 
                Opertions()
            } else if (Array.isArray(log.collects) && !log.collects.length) {
                getBundleFromType(i).then((res) => {
                    if (typeof res === "undefined") {
                        ReDo.push(i)
                    } else {
                        TotalBundledArray.push(res)
                    }   
                }).catch((e) => {
                    ReDo.push(i)
                }) 
                Opertions()
            } else if (!Array.isArray(log.collects)) {
                console.log(log)
                Opertions()
            }
        });
    })
}

FindBundles()

    ctx.body = "Hi"
}

module.exports = InitializeBundles