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
  .get('/api/test', UpdateRecommendedProducts)
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
  .get('/post-product', ctx => {
    ctx.res.statusCode = 200;
    ctx.body = 'Hello!'
  })
  .post('/post-product/:id', postFrequentProduct)

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
      scopes: ['read_products', 'write_products', 'read_themes', 'write_themes'],
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

        storeModel.findOne({ url: `https://${shop}` }, async function(err, res) {
          var Array = await res.Bundles

          agenda.jobs({'name': 'update products', 'data.id': res.JobInfo}, function(err, jobs) {
            if(jobs[0]){
                jobs[0].remove();
            }
          });

          Array.forEach(element => {
            bundleModel.findOneAndDelete({ _id: element })
          });
        })


        storeModel.findOneAndDelete({ url: `https://${shop}`}, async function(err) {
          if (!err) {
                  console.log("Found One Record.")
          }
          else {
                  message.type = 'No Records Found, or auth';
          }
         })

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
        
        var jobId = ""

        agenda.define('update products', {priority: 'high'}, async job => {
          const {shopData} = job.attrs.data
          jobId = `updatesFor${shop}`
          job.unique({ 'data.id': `updatesFor${shop}` });
          UpdateRecommendedProducts(shopData)
        });
        
        (async function() {       
          await agenda.start()
          await agenda.every('1440 minutes', 'update products', {shopData: `${shop}`}, { skipImmediate: true }, { timezone: "UTC"});
        })();
        

        // Saving Store Data to MongoDB
        const storeData = storeModel({
          url: `https://${shop}`,
          accessToken: accessToken,
          FreeShipEnabled: false,
          FreeShippingThreshold: 0,
          BundleConfigs: {
            Title: 'Frequently Bought Together',
            Theme: 10
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
          JobInfo: jobId
        })

        storeData.save(async function(err, doc) {
          if (err) return console.error(err);
          console.log("Document saved succussfully!");
        });

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