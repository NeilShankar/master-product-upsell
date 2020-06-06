require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');

const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const Sentry = require('@sentry/node');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const puppeteer = require('puppeteer');

const getRawBody = require('raw-body')
const crypto = require('crypto')
const secretKey = process.env.SHOPIFY_API_SECRET_KEY

const axios = require('axios');
const CircularJSON = require('circular-json')

const postFrequentProduct = require('./routes/frequent-bought')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cookie = require('cookie');

// Jobs
const UpdateRecommendedProducts = require('./Jobs/dailyUpdate')

// Service Handlers
const updateBundleInfo = require('./services/updateBundleInfo')
const getBundleInfo = require('./services/getBundleInfo')
const getProducts = require('./services/getProducts')
const getStoreInfo = require('./services/getStoreInfo')
const getMetrics = require('./services/getMetricInfo')

// API Endpoints For Bundles
const InitializeBundles = require('./services/InitialiazeBundles')
const getAllBundles = require('./services/GetAllBundles')
const DiscountBundle = require('./services/BundleDiscount')
const SelectProduct = require('./services/SelectProduct')
const DiscountAllBundle = require('./services/BundleAllDiscount')
const GetAllProduct = require('./services/GetAllProduct')
const ResetProducts = require('./services/ResetProducts')
const ApplyRecommendation = require('./services/ApplyRecommendation')
const ApplyNewRecommendation = require('./services/ApplyNewRecommendation')
const ApplyAllNewRecommendation = require('./services/ApplyAllNewRecommendation')
const ApplyAllRecommendation = require('./services/ApplyAllRecommendation')
const EnabledBundles = require('./services/BundlesEnabled')
const CheckEnabled = require('./services/CheckEnabled')
const generateDiscount = require('./routes/discounter')

// Theme Required Snippets
// const cartSnippet = require('./scripts/cart-snippet.js')

const schedule = require('node-schedule');

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;

var exp = require('express');
var express = exp();
var cors = require('koa2-cors');

express.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.prepare().then(() => {  

  var bodyParser = require('koa-bodyparser');

  const server = new Koa();
  server.use(bodyParser());

  const router = new Router();
  server.use(session({ sameSite: 'none', secure: true }, server));

  server.keys = [SHOPIFY_API_SECRET_KEY]; 

  router
  .get('/api', ctx => {
    ctx.res.statusCode = 200;  
    ctx.body = "> Drops API is up and running"
  })
  .post('/api/saveBundleInfo', updateBundleInfo)
  .get('/api/getBundleInfo', getBundleInfo)
  .get('/api/getProducts', getProducts)
  .get('/api/allProducts', GetAllProduct)
  .get('/api/resetProducts', ResetProducts)
  .get('/api/getStoreInfo', getStoreInfo)
  .get('/api/getAllBundles', getAllBundles)
  .post('/api/bundlesEnabled', EnabledBundles)
  .get('/api/enabledCheck', CheckEnabled)
  .get('/api/test', UpdateRecommendedProducts)
  .get('/api/applyAllNewRecommendation', ApplyAllNewRecommendation)
  .get('/api/applyAllRecommendation', ApplyAllRecommendation)
  .post('/api/selectProduct', SelectProduct)
  .post('/api/applyRecommendation', ApplyRecommendation)
  .post('/api/applyNewRecommendation', ApplyNewRecommendation)
  .post('/api/discountBundle', DiscountBundle)
  .post('/api/discountBundleAll', DiscountAllBundle)
  .get('/api/getMetrics', getMetrics)
  .get('/api/currentShop', ctx => {
    ctx.body = ctx.session.shop
  })

  router
  .get('/post-product/:id', postFrequentProduct)
  .post('/generate-discount/:id', generateDiscount)

  router
  .get('/scripts/cart-snippet.js', ctx => {
    ctx.body = `
      jQuery(document).ready(function() {
        function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }

        if (localStorage.getItem("TotalDiscountedPrice") !== null) {
          var DiscountText = localStorage.getItem("TotalDiscountedPrice")
          var currency = getCookie("cart_currency")
          var txt1 = '<div class="shopLee_cartSnippet" style="position: relative; height: 84px; border-left: 6px solid #4ac24a; border-radius: 5px; width: 31%; text-align: center; padding: 10px 0; box-shadow: 0px 0px 27px 0px rgba(122,112,122,0.56); top: 3.5em; margin-bottom: 1em; background: #ffffff;">' +
          '<h5 style="margin-bottom: 6px;">Bundle Discount</h5>' +
          '<p style="font-size: 13.5px;">Hooray, you have availed '+ DiscountText + ' ' + currency + ' ' + ' Off on your Bundles!</p>' +
          '</div>'

          $("[name=checkout]").after(txt1);
          $("[name=checkout]").css("position", "absolute");
          $("[name=checkout]").addClass("shopLee_checkout");

          $(window).resize(function() {
            var width = $(window).width();
            if (width < 767){
              $("[name=checkout]").css("width", "80%");
              $(".shopLee_cartSnippet").css("width", "100%");
              $(".shopLee_cartSnippet").css("top", "4.5em");
              $(".shopLee_cartSnippet").css("margin-bottom", "2em");
            } else {
              $("[name=checkout]").css("width", "10%");
              $(".shopLee_cartSnippet").css("width", "31%");
              $(".shopLee_cartSnippet").css("top", "3.5em");
              $(".shopLee_cartSnippet").css("margin-bottom", "1em");
            }
          });
        }
      });
    `
  })

  // router
  // .get('/endpoints/getScripts', async (ctx) => {
  //     const response = await fetch(
  //     `https://test-nsn.myshopify.com/admin/api/2020-04/script_tags/112803676221.json`,
  //         {
  //             method: "PUT",
  //             headers: {
  //             "Content-Type": "application/json",
  //             "X-Shopify-Access-Token": "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",
  //             },
  //             body: JSON.stringify({
  //               "script_tag": {
  //                 "id": 112803676221,
  //                 "src": "https://8479d5748b7b.ngrok.io/scripts/cart-snippet.js"
  //               }
  //             })
  //         }
  //     );

  //     const responseJson = await response.json();

  //     ctx.body = await responseJson
  // })

  // Sentry
  Sentry.init({ dsn: 'https://4fd23a47916849a1abc8c822cb6d598f@o397020.ingest.sentry.io/5251173' });

  // MongoDB Configurations 
  const mongoose = require('mongoose')
  mongoose.connect(`${process.env.MONGO_DB_URL}`, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false });

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function() {
    console.log("Connection To MongoDB Atlas Successful!");
  });

  
  const Agenda = require('agenda');

  const agenda = new Agenda({
      db: {address: process.env.MONGO_DB_URL, collection: 'Jobs'},
      processEvery: '30 seconds'
  });

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'read_themes', 'write_themes', 'write_price_rules', 'read_price_rules', 'read_script_tags', 'write_script_tags'],
      accessMode: 'offline',
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        require('./models/store')
        const storeModel = mongoose.model('Store')

        require("./models/bundles");
        const bundleModel = mongoose.model("Bundle");

         const response = await fetch(
          `https://${ctx.session.shop}/admin/api/2020-04/shop.json`,
              {
                  method: "GET",
                  headers: {
                  "Content-Type": "application/json",
                  "X-Shopify-Access-Token": accessToken,
                  },
              }
          );
  
          const responseJson = await response.json();
          var results = JSON.parse(JSON.stringify(responseJson));
      
          ShopUser = results.shop.shop_owner
          ShopName = results.shop.name
          Currency = results.shop.currency

        storeModel.findOne({ url: `https://${shop}`}, async (err, res) => {
          if (!err & res) {
            await storeModel.findByIdAndUpdate(res._id, { accessToken: accessToken }, (err, res) => {
              if (err) {
                console.log(err)
              }
            })
          } else {
            // Saving Store Data to MongoDB
            const storeData = storeModel({
              url: `https://${shop}`,
              domain: `https://${results.shop.domain}`,
              accessToken: accessToken,
              FreeShipEnabled: false,
              FreeShippingThreshold: 0,
              BundleConfigs: {
                title: "Frequently Bought Products",
                titleColor: "#000",
                buttonText: "Add Bundle To Cart",
                buttonBackground: "#000",
                buttonTextColor: "#fff",
                buttonBorderColor: "#fff",
                buttonHoverBackground: "#fff",
                buttonHoverTextColor: "#000",
                buttonHoverBorderColor: "#000",
                Enabled: true
              }, 
              Metrics: {
                ThisMonth: {
                  Sales: 0,
                  AddToCarts: 0,
                  Views: 0,
                  Currency: Currency
                },
                LastMonth: {
                  Sales: 0,
                  AddToCarts: 0,
                  Views: 0,
                  Currency: Currency
                }            
              },
              ShopInfo: {
                UserName: ShopUser,
                ShopName: ShopName
              },
              JobInfo: `updaterFor${shop}`
            })

            storeData.save(async function(err, doc) {
              if (err) return console.error(err);
              console.log("Document saved succussfully!");
            });

            agenda.define('update products', {priority: 'high'}, async job => {
              const {shopData, upJobId} = job.attrs.data
              job.unique({ 'data.id': `updatesFor${shop}` });
              UpdateRecommendedProducts(shopData)
            });
            
            (async function() {       
              await agenda.start()
              await agenda.every('1440 minutes', 'update products', {shopData: `${shop}`, upJobId: `updaterFor${shop}`}, { skipImmediate: true }, { timezone: "UTC"});
            })();

            var ScriptData = JSON.stringify({
              "script_tag": {
                "event": "onload",
                "src": `${process.env.HOST}scripts/cart-snippet.js`
              }
            })

            const scriptTag = await fetch(
              `https://${ctx.session.shop}/admin/api/2020-04/script_tags.json`,
                  {
                      method: "POST",
                      headers: {
                      "Content-Type": "application/json",
                      "X-Shopify-Access-Token": accessToken,
                      },
                      body: ScriptData
                  }
              );
          }
        })

        const getThemes = require('./templates/default')

        getThemes(`https://${shop}`, accessToken)
        InitializeBundles(ctx)


        const registration = await registerWebhook({
          address: `${HOST}/webhooks/products/create`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.April20
        });

        if (registration.success) {
          console.log('Successfully registered webhook!');
        } else {
          console.log('Failed to register webhook', registration.result);
        }
        await getSubscriptionUrl(ctx, accessToken, shop);
        // await getProductUrl(ctx, accessToken, shop)        
      }
    })
  );
  
  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post('/webhooks/products/create', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook);
  });

  server.use(graphQLProxy({ version: ApiVersion.April19 }));

  router.get('*', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  function checkOriginAgainstWhitelist(ctx) {
    const requestOrigin = ctx.accept.headers.origin || process.env.HOST;
    require('./models/store')
    const storeModel = mongoose.model('Store')
    
    storeModel.findOne({'url': requestOrigin}, function(err, resad){
      console.log('Valid Origin Point.');
      if (!resad) {
        storeModel.findOne({ 'domain': requestOrigin })
      }
    });    
    return requestOrigin;
  }

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.use(cors({ origin: checkOriginAgainstWhitelist }));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});