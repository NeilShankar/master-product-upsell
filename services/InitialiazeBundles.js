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
    const shopURL = ctx.session.shop
    const aToken = ctx.session.accessToken

    const count = await fetch(`https://${shopURL}/admin/api/2020-04/products/count.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "X-Shopify-Access-Token": aToken,
      }
    })
  
    const countJson = await count.json();
    var ProdCount = countJson.count
    var NumberOfTimes = ProdCount / 250
    var sourceArray = []
    var id = 0

    var today = new Date()

    function diff_minutes(dt2, dt1) 
    {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);

    }

    var ProductInfo = []
    
    async function getAllProducts() {
        id = sourceArray[sourceArray.length - 1]
        if (sourceArray.length) {
            const products = await fetch(`https://${shopURL}/admin/api/2020-04/products.json?limit=250&since_id${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": aToken,
            }
            })

            const productsJson = await products.json();


            productsJson.products.forEach(element => {
                sourceArray.push(`${element.id}`)
            });

            productsJson.products.forEach(element => {
                var ImageSrc = ""
                if (element["image"] != null) { 
                    ImageSrc = element["image"]["src"] 
                } else {
                    ImageSrc = "https://cynthiarenee.com/wp-content/uploads/2018/11/placeholder-product-image.png"
                }
                ProductInfo.push({
                    "Id": element.id,
                    "Title": element.title,
                    "ImageSrc": ImageSrc
                })
            })

            return sourceArray
        } else {
            const products = await fetch(`https://${shopURL}/admin/api/2020-04/products.json?limit=250`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": aToken,
            }
            })

            const productsJson = await products.json();


            productsJson.products.forEach(element => {
                sourceArray.push(`${element.id}`)
            });

            productsJson.products.forEach(element => {
                var ImageSrc = ""
                if (element["image"] != null) { 
                    ImageSrc = element["image"]["src"] 
                } else {
                    ImageSrc = "https://cynthiarenee.com/wp-content/uploads/2018/11/placeholder-product-image.png"
                }
                ProductInfo.push({
                    "Id": element.id,
                    "Title": element.title,
                    "ImageSrc": ImageSrc
                })
            })

            return sourceArray
        }
    }


    async function request(i) {
        const collections = await fetch(`https://${shopURL}/admin/api/2020-04/collects.json?product_id=${i}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": aToken,
            }
        })
  
        const collectionsJson = await collections.json();

        return collectionsJson
    }

    async function requestProductFromCollection(collection, prod) {
            const collectionOfProd = await fetch(`https://${shopURL}/admin/api/2020-04/collections/${collection}/products.json`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": aToken,
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

            var SourceProductInfo = {"Title": "", "ImageSrc": ""}
            var RecommendedProductInfo = {"Title": "", "ImageSrc": ""}

            ProductInfo.forEach(function(product) {
                if (product.Id === RecommendedProduct) {
                    RecommendedProductInfo = {
                        "Title": `${product.Title}`,
                        "ImageSrc": `${product.ImageSrc}`
                    }
                }
                if (product.Id === parseInt(prod)) {
                    SourceProductInfo = {
                        "Title": `${product.Title}`,
                        "ImageSrc": `${product.ImageSrc}`
                    }
                }
            })

            var Bundled = JSON.parse(JSON.stringify({
                "SourceProduct": {
                    "Id": `${prod}`,
                    "Title": SourceProductInfo.Title,
                    "ImageSrc": SourceProductInfo.ImageSrc
                },
                "RecommendedProduct": {
                    "Id": `${RecommendedProduct}`,
                    "Title": RecommendedProductInfo.Title,
                    "ImageSrc": RecommendedProductInfo.ImageSrc
                },
                "NewRecommendedProduct": {
                    "Id": "None",
                    "Title": "None",
                    "ImageSrc": "None"
                },
                "SelectedProduct": {
                    "Id": `${RecommendedProduct}`,
                    "Title": RecommendedProductInfo.Title,
                    "ImageSrc": RecommendedProductInfo.ImageSrc
                },
                "ChoosenBy": "Collection",
                "RelateID": collection,
                "Discount": 0
            }))
            return Bundled
    }

    async function requestProductFromType(prod) {
            const ProductType = await fetch(`https://${shopURL}/admin/api/2020-04/products/${prod}.json?fields=product_type`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": aToken,
            }
            })
    
            const JsonPT = await ProductType.json();
            const type = JsonPT.product.product_type

            await sleep(1000)

            const SimilarProds = await fetch(`https://${shopURL}/admin/api/2020-04/products.json?product_type=${type}&fields=id`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                "X-Shopify-Access-Token": aToken,
                }
            })
    
            const SimProdsJson = await SimilarProds.json();

            function collectRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            const FbTproduct = collectRandom(0, SimProdsJson.products.length);

            var RecommendedProduct = SimProdsJson.products[FbTproduct].id

            if (RecommendedProduct == prod) {
                if (SimProdsJson.products.length > 1) {
                    if (FbTproduct < SimProdsJson.products.length) {
                        FbTproduct = FbTproduct + 1
                        RecommendedProduct = SimProdsJson.products[FbTproduct].id
                    } else {
                        FbTproduct = FbTproduct - 1
                        RecommendedProduct = SimProdsJson.products[FbTproduct].id
                    }
                // } else {
                //     await sleep(1000)
                //     const NewProd = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products.json?product_type=${type}`, {
                //         method: 'GET',
                //         headers: {
                //         'Content-Type': 'application/json',
                //         "X-Shopify-Access-Token": aToken,
                //         }
                //     })
            
                //     const NewProdJson = await NewProd.json();      
                    
                //     FbTproduct = collectRandom(0, NewProdJson.products.length);
                //     RecommendedProduct = NewProdJson.products[FbTproduct].id
                // 
            }}

            var SourceProductInfo = {"Title": "", "ImageSrc": ""}
            var RecommendedProductInfo = {"Title": "", "ImageSrc": ""}

            ProductInfo.forEach(function(product) {
                if (product.Id === RecommendedProduct) {
                    RecommendedProductInfo = {
                        "Title": `${product.Title}`,
                        "ImageSrc": `${product.ImageSrc}`
                    }
                }
                if (product.Id === parseInt(prod)) {
                    SourceProductInfo = {
                        "Title": `${product.Title}`,
                        "ImageSrc": `${product.ImageSrc}`
                    }
                }
            })

            var BundledFromType = JSON.parse(JSON.stringify({
                "SourceProduct": {
                    "Id": `${prod}`,
                    "Title": `${SourceProductInfo.Title}`,
                    "ImageSrc": `${SourceProductInfo.ImageSrc}`
                },
                "RecommendedProduct": {
                    "Id": `${RecommendedProduct}`,
                    "Title": RecommendedProductInfo.Title,
                    "ImageSrc": RecommendedProductInfo.ImageSrc
                },
                "NewRecommendedProduct": {
                    "Id": "None",
                    "Title": "None",
                    "ImageSrc": "None"
                },
                "SelectedProduct": {
                    "Id": `${RecommendedProduct}`,
                    "Title": RecommendedProductInfo.Title,
                    "ImageSrc": RecommendedProductInfo.ImageSrc
                },
                "ChoosenBy": "Type",   
                "RelateID": type,
                "Discount": 0
            }))

            return BundledFromType
    }


    const get = stopcock(request, { bucketSize: 1, interval: 1000 });
    const getBundleFromCollection = stopcock(requestProductFromCollection, { bucketSize: 1, interval: 1000 });
    const getBundleFromType = stopcock(requestProductFromType, { bucketSize: 1, interval: 1000 });
    const getAllProductsFromStore = stopcock(getAllProducts, { bucketSize: 2, interval: 1000 });
    
    if (ProdCount > 250) {
        NumberOfTimes = Math.round(ProdCount / NumberOfTimes)
        for (i = 0; i < NumberOfTimes; i++) {
            getAllProductsFromStore().then((res) => {
                console.log("Multiple Loops In Getting Products.")
            }).catch((err) => {
                console.log("Got some err.", err)
            })
            if (i == NumberOfTimes) {
                FindBundles()
            }
        }
    } else {
        getAllProductsFromStore().then((res) => {
            FindBundles()
        }).catch((err) => {
            console.log("Got some err.", err)
        })
    }

    var TotalBundledArray = []
    var BundleIdArray = []

    async function createBundlesInDB() {
        try {
            bundleModel.insertMany(TotalBundledArray).then((res) => {
                res.forEach(element => {
                    BundleIdArray.push(element._id)
                })

                storeModel.updateOne({ url: `https://${shopURL}`}, { Bundles: BundleIdArray, "ServiceEnabled": true}, (err, res) => {
                    if (err) {
                       console.log(err)
                    }
                })
                console.log("Finished Creating default bundles in MongoDB")
            })
        } catch (e) {
            console.log(e)
        }
        // console.log("Test Ended.")
    }

    var Complete = 0
    var Total = 0
    

    function Opertions() {
        ++Complete
        if (Complete === Total) {
            Complete = 0
            Total = 0
            if (sourceArray.length) {
                Retry()
            } else {
                var completed = new Date()
                var ComTime = diff_minutes(today, completed)
                console.log(`Completed in ${ComTime} minute(s)`)
                createBundlesInDB()
            }            
        }
    }

    async function Retry() {
        sleep(20000)
        FindBundles()
    }

function FindBundles() {
    sourceArray.forEach(function(i){
        Total = sourceArray.length
        get(i).then((log) => {
            if (Array.isArray(log.collects) && log.collects.length) {
                getBundleFromCollection(log.collects[0].collection_id, i).then((res) => {
                    if (typeof res === "undefined") {
                        return;
                    } else {
                        TotalBundledArray.push(res)

                        var index = sourceArray.indexOf(i);
                        if (index > -1) {
                         sourceArray.splice(index, 1);
                        }
                    }                    
                }).catch((e) => {
                    if (e) {
                        return;
                    }
                }).finally(function() {
                    Opertions()
                }) 
            } else if (Array.isArray(log.collects) && !log.collects.length) {
                getBundleFromType(i).then((res) => {
                    if (typeof res === "undefined") {
                        return;
                    } else {
                        TotalBundledArray.push(res)
                        var index = sourceArray.indexOf(i);
                        if (index > -1) {
                         sourceArray.splice(index, 1);
                        }
                    }   
                }).catch((e) => {
                    if (e) {
                        return;
                    }
                }).finally(function() {
                    Opertions()
                })
            } else if (!Array.isArray(log.collects)) {
                console.log(log)
                Opertions()
            }
        });
    })
}
}

module.exports = InitializeBundles