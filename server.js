require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');

const getRawBody = require('raw-body')
const crypto = require('crypto')
const secretKey = process.env.SHOPIFY_API_SECRET_KEY

const axios = require('axios');
const CircularJSON = require('circular-json')

const proxyRoute = require('./server/proxy')
const postFrequentProduct = require('./routes/frequent-bought')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cookie = require('cookie');

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
  .post('/api/:object', async (ctx) => {
    if (ctx.params.object === "shopUserInfo") {       
      shopURL = `https://${ctx.session.shop}`
      const delay = require('delay');
    
      var accessT = null

      require('./models/store')
      const storeModel = mongoose.model('Store')

      storeModel.findOne({ url: shopURL }, async function(err, data) {
        accessT = await data.accessToken
      }).catch((e) => {
        console.log(e)
      })

      await delay(5000)

      const shopInfo = await fetch(
        `${shopURL}/admin/api/2020-04/shop.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessT,
          },
        }
      );
    
      const responseJson = await shopInfo.json();
      var results = JSON.parse(JSON.stringify(responseJson));

      await delay(2000)

      ctx.body = await results["shop"]["shop_owner"]
      
    }
  })

  router
  .get('/post-product', ctx => {
    ctx.res.statusCode = 200;
    ctx.body = 'Hello!'
  })
  .post('/post-product/:id', postFrequentProduct)

  // // MongoDB Configurations 
  const mongoose = require('mongoose')
  mongoose.connect(`mongodb+srv://adminNeil:${process.env.MONGO_DB_PASS}@cluster0-1nthp.gcp.mongodb.net/storesDB?retryWrites=true&w=majority`, {useNewUrlParser: true,  useUnifiedTopology: true });

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function() {
    console.log("Connection To MongoDB Successful!");
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

        storeModel.findOneAndDelete({ url: `https://${shop}`}, function(err) {
          if (!err) {
                  console.log("Found One Record.")
          }
          else {
                  message.type = 'No Records Found, or auth';
          }
         })

        // Saving Store Data to MongoDB
        const storeData = storeModel({
          url: `https://${shop}`,
          accessToken: accessToken,
          FreeShipEnabled: false,
          FreeShippingThreshold: 0
        })

        storeData.save(async function(err, doc) {
          if (err) return console.error(err);
          console.log("Document saved succussfully!");
        });

        const getThemes = require('./templates/default')

        getThemes(`https://${shop}`, accessToken)

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