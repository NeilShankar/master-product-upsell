require('isomorphic-fetch');
require('dotenv').config();
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

const postFrequentProduct = require('./routes/frequent-bought')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cookie = require('cookie');

// Emailer - Sendgrid :)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
const EnabledUpdating = require('./services/CheckUpdateEnabled')
const EnableUpdater = require('./services/EnableUpdater')
const checkFirstTime = require('./services/checkFirstTime')

// Theme Required Snippets
// const cartSnippet = require('./scripts/cart-snippet.js')

// Testing Routes
const getThemes = require('./templates/default')

const schedule = require('node-schedule');

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
} = process.env;

var cors = require('koa2-cors');

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
    ctx.body = "> Shop Lee API is up and running"
  })
  .post('/api/saveBundleInfo', updateBundleInfo)
  .get('/api/getBundleInfo', getBundleInfo)
  .get('/api/getProducts', getProducts)
  .get('/api/allProducts', GetAllProduct)
  .get('/api/checkFirstTime', checkFirstTime)
  .get('/api/resetProducts', ResetProducts)
  .get('/api/checkUpdatesEnable', EnabledUpdating)
  .get('/api/getStoreInfo', getStoreInfo)
  .get('/api/getAllBundles', getAllBundles)
  .post('/api/bundlesEnabled', EnabledBundles)
  .get('/api/enabledCheck', CheckEnabled)
  .get('/api/test', UpdateRecommendedProducts)
  .get('/api/applyAllNewRecommendation', ApplyAllNewRecommendation)
  .get('/api/applyAllRecommendation', ApplyAllRecommendation)
  .post('/api/updatesEnable', EnableUpdater)
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

  router.post('/api/conversions', async (ctx) => {
    require('./models/store')
    const storeModel = mongoose.model('Store')

    const store = await storeModel.findOne({ url: `https://${ctx.session.shop}` })

    const increaseSales = await store.Metrics.ThisMonth.Sales + ctx.request.body.sale
    const storeUpdate = await storeModel.findOneAndUpdate({ url: `https://${ctx.session.shop}` }, {$set: {"Metrics.ThisMonth.Sales": increaseSales}})

    ctx.body = "Hello."
  })

  router
  .get('/scripts/cart-snippet.js', ctx => {
    ctx.body = `
    jQuery(document).ready(function() {
      function removeExistingItem(key) {
        if (localStorage.getItem(key) === null)
          return false;
        localStorage.removeItem(key);
        return true;
      }

      jQuery.ajax({
        type: 'GET',
        url: '/cart.js',
        dataType: 'json',   
        success: function(res) {      
          if (res.item_count <= 0) {
            console.log("Cleared Bundles")
            removeExistingItem("CartBundles")
            removeExistingItem("PriceRuleId")
            removeExistingItem("TotalDiscountedPrice")
          }
        }
      })

      setInterval(() => {
        var cartItems = []
        var bundles = JSON.parse(localStorage.getItem("CartBundles")) || []
        var BundlesMatched = []

        if (!bundles.length) { return ; }

        jQuery.ajax({
          type: 'GET',
          url: '/cart.js',
          dataType: 'json',   
          success: function(res) {      
            if (res.item_count <= 0) {
              return ;
            } else {
              cartItems = [...res.items]
              checkValidator()
            }
          }
        })
         function checkValidator() {
            for (i=0; i < bundles.length; i++) {
                var matchSource = false
                var matchSelect = false
                for (c=0; c < cartItems.length; c++) {
                    if (bundles[i].SelectedVariantSource === cartItems[c].variant_id) {
                        matchSource = true
                        break ;
                    }
                }
                for (c=0; c < cartItems.length; c++) {
                    if (bundles[i].SelectedVariantSelect === cartItems[c].variant_id) {
                        matchSelect = true
                        break ;
                    }
                }
                if (matchSource === true && matchSelect === true) {
                    BundlesMatched.push(bundles[i])
                }                
          }

          if (!BundlesMatched.length) {
            return;
          }

          localStorage.setItem("CartBundles", JSON.stringify(BundlesMatched))

          if (JSON.stringify(bundles) !== JSON.stringify(BundlesMatched)) {
               createNewDiscount(BundlesMatched, BundlesMatched[0].BundleId)
          }
         }
      }, 5000);

      function createNewDiscount(array, bundId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
          var discountData = JSON.parse(this.responseText)
          var FixDiscount = discountData.DiscountedPrice
          var FixedDiscountP = FixDiscount.toFixed(2)
          localStorage.setItem("PriceRuleId", discountData.priceRuleId);
          localStorage.setItem("TotalDiscountedPrice", FixedDiscountP)
          var url = window.location.hostname
          var redirect = window.location.pathname
        if (FixedDiscountP !== 0) {
          window.location.href = "https://"+url+"/discount/"+discountData.discountCode+"?redirect="+redirect
        }
        }	
        };
        xhttp.open("POST", "https://912288751566.ngrok.io/generate-discount/"+bundId, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(array));
      }

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
      if (localStorage.getItem("TotalDiscountedPrice") !== null && localStorage.getItem("TotalDiscountedPrice") > 0) {
        var DiscountText = localStorage.getItem("TotalDiscountedPrice")
        var currency = getCookie("cart_currency")
        var txt1 = '<div class="shopLee_cartSnippet" style="position: relative; padding: 10px 42px !important; height: 84px; border-left: 6px solid #4ac24a; border-radius: 5px; width: 31%; text-align: center; padding: 10px 0; box-shadow: 0px 0px 27px 0px rgba(122,112,122,0.56); top: 3.5em; margin-bottom: 1em; background: #ffffff;">' +
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
      scopes: ['read_products', 'write_products', 'read_themes', 'write_themes', 'write_price_rules', 'read_price_rules', 'read_script_tags', 'write_script_tags', 'read_orders', 'write_orders'],
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

        require("./models/user");
        const userModel = mongoose.model("User");

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

          var user = await userModel.findOne({ email: results.shop.email }, async (err, res) => {
            if (!res) {
              var newUser = userModel({
                name: results.shop.shop_owner,
                email: results.shop.email,
                shop: results.shop.name
              })
  
              newUser.save(async function(err, doc) {
                if (err) return console.error(err);
                console.log("User saved succussfully!");
              });
            }
          })        
      
          ShopUser = results.shop.shop_owner
          ShopName = results.shop.name
          Currency = results.shop.currency

          const msg = {
            to: results.shop.email,
            from: 'neilshankarnath@gmail.com',
            templateId: 'd-6d8f52aca50846a2a01bcc294a277d53',
        
            dynamic_template_data: {
              name: `${results.shop.shop_owner}`,
              app_url: `${process.env.HOST}`
            },
          };
      
          // const {
          //   classes: {
          //     Mail,
          //   },
          // } = require('@sendgrid/helpers');
      
          // const mail = Mail.create(msg);
          // const body = mail.toJSON();
          // console.log('Sending install Email.', body);
          // await sgMail.send(msg);

        storeModel.findOne({ url: `https://${shop}`}, async (err, res) => {
          if (err) {
            console.log(err)
          }

          if (res) {
            await storeModel.findByIdAndUpdate(res._id, { accessToken: accessToken, "BundleConfigs.Enabled": true, "ServiceEnabled": true }, async (err, res) => {
              if (err) {
                console.log(err)
              }
            })

            const scriptTagGet = await fetch(
              `https://${ctx.session.shop}/admin/api/2020-04/script_tags.json?src=${process.env.HOST}/scripts/cart-snippet.js`, {
                      method: "GET",
                      headers: {
                      "Content-Type": "application/json",
                      "X-Shopify-Access-Token": accessToken,
                      }
            });

            const reScripts = await scriptTagGet.json()

            var scriptsArr = []
            scriptsArr = [...reScripts.script_tags]

            scriptsArr.forEach(async (element) => {
              await fetch(
                `https://${ctx.session.shop}/admin/api/2020-04/script_tags/${element.id}.json`, {
                        method: "DELETE",
                        headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": accessToken,
                        }
              });
            });

            console.log("Pre-Initiliazed, so not doing more work...")            
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
              UpdatingEnabled: true,
              ServiceEnabled: false,
              JobInfo: `updaterFor${shop}`
            })

            storeData.save(async function(err, doc) {
              if (err) return console.error(err);
              console.log("Document saved succussfully!");
            });

            getThemes(`https://${shop}`, accessToken)
            InitializeBundles(ctx)
          }
        })

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
            "src": `${process.env.HOST}/scripts/cart-snippet.js`
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

        const orderWebhook = await registerWebhook({
          address: `${process.env.HOST}/webhooks/orders/create`,
          topic: 'ORDERS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.April20
        });       
        
        const uninstallWebhook = await registerWebhook({
          address: `${process.env.HOST}/webhooks/app/uninstalled`,
          topic: 'APP_UNINSTALLED',
          accessToken,
          shop,
          apiVersion: ApiVersion.April20
        });   

        if (uninstallWebhook.success) {
          console.log('Successfully registered webhook uninstall hook!');
        } else {
          console.log('Failed to register webhook', uninstallWebhook.result);
        }

        if (orderWebhook.success) {
          console.log('Successfully registered webhook order hook!');
        } else {
          console.log('Failed to register webhook', orderWebhook.result);
        }

        await getSubscriptionUrl(ctx, accessToken, shop);     
      }
    })
  );

  // Webhooks

  const webhook = receiveWebhook({secret: SHOPIFY_API_SECRET_KEY});

  router.post('/webhooks/app/uninstalled', webhook, async (ctx) => {
    const webhook = ctx.state.webhook

    require('./models/store')
    const storeModel = mongoose.model('Store')
    
    const updateUninstalledState = await storeModel.findOneAndUpdate({ url: `https://${webhook.domain}`}, {$set: {"BundleConfigs.Enabled": false, "ServiceEnabled": false}})

    const msg = {
      to: webhook.payload.email,
      from: 'neilshankarnath@gmail.com',
      templateId: 'd-128559708c5949cf8eb51bac9cca8218',
  
      dynamic_template_data: {
        subject: `Oh, no! We Are Sorry To See You Go ${webhook.payload.shop_owner}!`,
        name: `${webhook.payload.shop_owner}`
      },
    };

    const {
      classes: {
        Mail,
      },
    } = require('@sendgrid/helpers');

    const mail = Mail.create(msg);
    const body = mail.toJSON();
    console.log('Sending Uninstall Email.', body);
    await sgMail.send(msg);

    ctx.body = "Sent."
  })
  .post('/webhooks/orders/create', webhook, async (ctx) => {
    const order = ctx.state.webhook.payload
    require('./models/store')
    const storeModel = mongoose.model('Store')

    if (order.discount_codes.length) {
      const storeMod = await storeModel.findOne({ url: `https://${ctx.state.webhook.domain}` })
      const discountsArray = await storeMod.DiscountCodes

      for (var i = 0; i < discountsArray.length; i++) {
        if (discountsArray[i] === order.discount_codes[0].code) {
          var newSales = storeMod.Metrics.ThisMonth.Sales + Math.trunc(parseInt(order.subtotal_price))
          const update = await storeModel.findByIdAndUpdate(storeMod._id, {$set: {"Metrics.ThisMonth.Sales": newSales}})
          } 
        }
      }
  })
  .post('/webhooks/shop/redact', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook);
  });

  server.use(graphQLProxy({ version: ApiVersion.April20 }));

  router.get('*', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  })

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