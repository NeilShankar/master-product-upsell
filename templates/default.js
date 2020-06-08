require("isomorphic-fetch");

const getThemes = async function getThemes(ShopURI, accessT) {
    const themes = await fetch(`${ShopURI}/admin/api/2020-04/themes.json`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessT,
      },
    });
    const responseJson = await themes.json();
    var results = JSON.parse(JSON.stringify(responseJson));

    var themeID = 0

    results["themes"].forEach(function(obj) { if (obj["role"] === "main") { themeID = obj["id"] } });



    var uploadFile = `

    <!--ShopLee App Configuration Code Begin-->
    <div class="container shopLee_container" id="shopLee_snippet" style="display: none;">
    
    </div>
    <!--   Don't modify the App Script, unless you are a developer and know what to do.     -->
    <script>
      function removeExistingItem(key) {
        if (localStorage.getItem(key) === null)
          return false;
        localStorage.removeItem(key);
        return true;
      }

      function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
          begin = dc.indexOf(prefix);
          if (begin != 0) return null;
        }
        else
        {
          begin += 2;
          var end = document.cookie.indexOf(";", begin);
          if (end == -1) {
            end = dc.length;
          }
        }
        // because unescape has been deprecated, replaced with decodeURI
        //return unescape(dc.substring(begin + prefix.length, end));
        return decodeURI(dc.substring(begin + prefix.length, end));
      } 
      var cartCookie = getCookie("cart");

      if (cartCookie == null) {
        removeExistingItem("CartBundles")
        removeExistingItem("PriceRuleId")
        removeExistingItem("TotalDiscountedPrice")
      } else {
        console.log("Cart Available.")
      }
      
      if ({{ cart.item_count }} <= 0) {
        removeExistingItem("CartBundles")
        removeExistingItem("PriceRuleId")
        removeExistingItem("TotalDiscountedPrice")
      }
      
      let sourceChangedVariant
      let selectChangedVariant
      let addToCartCall
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText)
          let BundleId = data.BundleId
          let BundleConfigs = data.BundleConfigs
          let sourceVariant = 0
          var selectVariant = 0
          var DiscountAmount = Math.round((data.Discount / 100) * parseInt(Math.trunc(data.products[0].variants[sourceVariant].price)) + parseInt(Math.trunc(data.products[1].variants[selectVariant].price)))
          var TotalPrice = parseInt(Math.trunc(data.products[0].variants[sourceVariant].price)) + parseInt(Math.trunc(data.products[1].variants[selectVariant].price))
          var DiscountedPrice = TotalPrice - DiscountAmount

          var FixedDiscountAmount = DiscountAmount.toFixed(2)
    
          let DisplayPriceText 
    
          if (data.Discount > 0) {
            DisplayPriceText = \`<span style="color: #1bbf3c;">\${DiscountedPrice} {{ shop.currency }}</span> <span style="text-decoration: line-through; color: gray;">\${TotalPrice} {{ shop.currency }}</span>\`
          } else {
            DisplayPriceText = \`<span style="color: #1bbf3c;">\${TotalPrice} {{ shop.currency }}</span>\` 
          }   
    
          var sourceVariantId = data.products[0].variants[sourceVariant].id
          var selectVariantId = data.products[1].variants[selectVariant].id
    
          var sourceProductVariantText = data.products[0].title + " - " + data.products[0].variants[0].title + " - " + data.products[0].variants[0].price + \` {{ shop.currency }}\`
          var selectProductVariantText = data.products[1].title + " - " + data.products[1].variants[0].title + " - " + data.products[1].variants[0].price + \` {{ shop.currency }}\`
    
          var countSource = 0
          var sourceVariants = data.products[0].variants.map((v, index) => { 
            if (v.inventory_quantity < 1) {
              return \`<option disabled value=\${v.id}>\${v.title} - Sold Out</option>\`;
            } else {
              if (countSource < 1) {
                sourceVariant = index
                countSource = countSource + 1
              }
              return \`<option value=\${v.id}>\${v.title}</option>\`;                  
            }
          })
    
          var countSelect = 0
          var selectVariants = data.products[1].variants.map((v, index) => {                 
            if (v.inventory_quantity < 1) {
              return \`<option disabled value=\${v.id}>\${v.title} - Sold Out</option>\`;
            } else {                  
              if (countSelect < 1) {
                selectVariant = index
                countSelect = countSelect + 1
              }
              return \`<option value=\${v.id}>\${v.title}</option>\`;
            }
          })
    
          sourceChangedVariant = (val) => {
            let i                
            for (i=0; i < data.products[0].variants.length; i++) {
              if (data.products[0].variants[i].id === parseInt(val)){
                sourceVariant = i
                sourceVariantId = data.products[0].variants[i].id
              }
            }
            document.getElementById('sourceProductVariantTxt').innerHTML = data.products[0].title + " - " + data.products[0].variants[sourceVariant].title + " - " + data.products[0].variants[sourceVariant].price + \` {{ shop.currency }}\`
            updatePricing()
          }
    
          selectChangedVariant = (val) => {
            let i                
            for (i=0; i < data.products[1].variants.length; i++) {
              if (data.products[1].variants[i].id === parseInt(val)){
                selectVariant = i
                selectVariantId = data.products[1].variants[i].id
              }
            }
            document.getElementById('selectProductVariantTxt').innerHTML = data.products[1].title + " - " + data.products[1].variants[selectVariant].title + " - " + data.products[1].variants[selectVariant].price + \` {{ shop.currency }}\`
            updatePricing()
          }
    
          updatePricing = () => {
            DiscountAmount = (data.Discount / 100) * (parseInt(data.products[0].variants[sourceVariant].price) + parseInt(data.products[1].variants[selectVariant].price))
            TotalPrice = parseInt(Math.trunc(data.products[0].variants[sourceVariant].price)) + parseInt(Math.trunc(data.products[1].variants[selectVariant].price))
            DiscountedPrice = TotalPrice - DiscountAmount    

            FixedDiscountAmount = DiscountAmount.toFixed(2)
            if (data.Discount > 0) {
              DisplayPriceText = \`<span style="color: #1bbf3c;">\${DiscountedPrice} {{ shop.currency }}</span> <span style="text-decoration: line-through; color: gray;">\${TotalPrice} {{ shop.currency }}</span>\`
            } else {
              DisplayPriceText = \`<span style="color: #1bbf3c;">\${TotalPrice} {{ shop.currency }}</span>\` 
            }  
    
            document.getElementById("shopLee_pricing").innerHTML = DisplayPriceText
          }
          
          addToCartCall = () => {
            jQuery.ajax({
              type: 'POST',
              url: '/cart/add.js',
              data: { 
                items: [
                  {
                    quantity: 1,
                    id: sourceVariantId
                  },
                  {
                    quantity: 1,
                    id: selectVariantId
                  },      
                ]
              },
              dataType: 'json',   
              success: function(res) {
                if (TotalPrice !== DiscountedPrice) {
                  document.getElementById("toast_discount_text").innerHTML = \`You have availed \${FixedDiscountAmount} {{ shop.currency }} Off! Discount will be applied automatically when you checkout.\`
                } else {
                  document.getElementById("toast_discount_text").innerHTML = \`Bundle Added To Cart! Thanks for shopping with us!\`
                }
            document.getElementById("toast_cart").style.display = "Block"
            storeCartData()
    
              }
            });  
          }
    
          function createNewDiscount(array) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange=function() {
              if (this.readyState == 4 && this.status == 200) {
            var discountData = JSON.parse(this.responseText)
            var FixDiscount = discountData.DiscountedPrice
	        	var FixedDiscountP = FixDiscount.toFixed(2)
            localStorage.setItem("PriceRuleId", discountData.priceRuleId);
            localStorage.setItem("TotalDiscountedPrice", FixedDiscountP)
            var url = window.location.hostname
            if (TotalPrice !== DiscountedPrice) {
              window.location.href = "https://"+url+"/discount/"+discountData.discountCode+"?redirect=/products/"+data.products[0].handle
            }
          }	
            };
        xhttp.open("POST", \`${process.env.HOST}/generate-discount/\${BundleId}\`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(array));
          }
                  
          function storeCartData() {
             if (typeof(Storage) !== "undefined") {
                  
                let BundlesArray = JSON.parse(localStorage.getItem("CartBundles")) || [];
                var priceRuleId = localStorage.getItem("PriceRuleId") || "NONE"
                  
                let bundle = {
                    "BundleId": data.BundleId,
                  "TotalPrice": TotalPrice,
                  "DiscountPrice": DiscountedPrice,
                  "SourceVariant": data.products[0].id,
                  "SelectVariant": data.products[1].id,
                  "PriceRuleId": priceRuleId
                }
              
                BundlesArray.push(bundle)
              
                localStorage.setItem("CartBundles", JSON.stringify(BundlesArray));
                createNewDiscount(BundlesArray)
               
             } else {
                  console.log("Sorry, your browser does not support Web Storage...")
             }
          }
        
          document.getElementById("shopLee_snippet").innerHTML = \`
              <h3 class='shopLee_title'>\${BundleConfigs.title}</h3>
              <div class="shopLee_triple">
              <div class="shopLee_sideByside shopLee_product">
              <a href='/products/\${data.products[0].handle}'>
              <img class="shopLee_productFirstImage" src='\${data.products[0].image.src}' />
                </a>
                </div>
              <div class="shopLee_sideBysideIcon shopLee_icon">
              <img class="shopLee_plus" src="https://cdn.shopify.com/s/files/1/0278/4611/5389/t/1/assets/plus.svg?v=1591170063" alt="plus-icon" />
                </div>
              <div class="shopLee_sideByside shopLee_product">
              <a href='/products/\${data.products[1].handle}'>
              <img class="shopLee_productSecondImage" src='\${data.products[1].image.src}' />
                </a>
                </div>
              <br style="clear: left;" />
                </div>
              <div class="shopLee_price">
              <input onClick="disableCheck()" checked type="checkbox" id="productSource" name="productSource" value="SourceProduct">
              <label id="sourceProductVariantTxt" for="productSource">\${sourceProductVariantText}</label>
              <select class="shopLee_variantSelect" onChange="sourceChanged(this.value)" name="Variants" id="sourceProductVariants">
              \${sourceVariants}
                </select>
              <br>
              <input onClick="disableCheck()" checked type="checkbox" id="productSelect" name="productSelect" value="SelectProduct">
              <label id="selectProductVariantTxt" style="margin-top: 8px;" for="productSelect">\${selectProductVariantText}</label>
              <select class="shopLee_variantSelect" onChange="selectChanged(this.value)" name="Variants" id="selectProductVariants">
              \${selectVariants}
                </select>
              <br>
              <p id="shopLee_pricing" class="shopLee_priceText">\${DisplayPriceText}</p>
          <button onClick="addToCart()" class="shopLee_button">\${BundleConfigs.buttonText}</button>
                </div>			
                <!--   Some Styling to give it a gorgeous look!     -->
                <style>
                .shopLee_button:hover { background: \${BundleConfigs.buttonHoverBackground}; color: \${BundleConfigs.buttonHoverTextColor}; border: 2px solid \${BundleConfigs.buttonHoverBorderColor}; }
                .shopLee_button { padding: 8px 22px; color: \${BundleConfigs.buttonTextColor}; margin-left: auto; transition: .5s; text-transform: uppercase; background: \${BundleConfigs.buttonBackground}; border-radius: 8px; border: 2px solid \${BundleConfigs.buttonBorderColor}; margin-right: auto; display: block; }
                .shopLee_priceText {text-align: center; margin-bottom: 5px; padding-top: 18px;}
                .shopLee_variantSelect {padding: 7px 22px 7px 5px; max-width: 7em;}
                .shopLee_title {text-align: center; color: \${BundleConfigs.titleColor}; }
                .shopLee_price { text-align: center; }
                .shopLee_triple {width: 500px; margin: auto;}
                .shopLee_sideByside {float: left; width: 200px; height: 100px;}
                .shopLee_sideBysideIcon {float: left; width: 100px; height: 100px;}  
                .shopLee_productFirstImage {width: 120px; float: right; margin-right: 1em;}
                .shopLee_productSecondImage {float: left; margin-left: 1em; width: 120px;}
                .shopLee_icon {position: relative;}
                #toast_cart {display: none;}
                .shopLee_plus {margin: 0; position: absolute; top: 50%; width: 28px; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}
               
          @media only screen and (max-width: 800px) {
            .shopLee_triple {  width: 100%; }
            .shopLee_sideByside { width: 40% }
            .shopLee_sideBysideIcon { width: 20% }
                }
               </style>	
              \`;
          document.getElementById('sourceProductVariantTxt').innerHTML = data.products[0].title + " - " + data.products[0].variants[sourceVariant].title + " - " + data.products[0].variants[sourceVariant].price + \` {{ shop.currency }}\`                  
          document.getElementById('selectProductVariantTxt').innerHTML = data.products[1].title + " - " + data.products[1].variants[selectVariant].title + " - " + data.products[1].variants[selectVariant].price + \` {{ shop.currency }}\`                  
          updatePricing()
        sourceVariantId = data.products[0].variants[sourceVariant].id
          selectVariantId = data.products[1].variants[selectVariant].id
          setTimeout(function(){ 
            document.getElementById("shopLee_snippet").style.display = "block";
          }, 3000);
        }
      };
      xhttp.open("GET", \`${process.env.HOST}/post-product/{{ product.id }}\`, true);
      xhttp.send();
    
      // Helper Functions
      function sourceChanged(value) {
        sourceChangedVariant(value)
      }
    
      function selectChanged(value) {
        selectChangedVariant(value)
      }
    
      function disableCheck() {
        document.getElementById("productSource").checked = true
        document.getElementById("productSelect").checked = true
      }
      
      function addToCart() {
        addToCartCall()
      }
      
    </script>
    
    <style>
      #toast_cart {display: none;}
      .add-margin{ margin-top:20px; } .toast__svg{ fill:#fff; } .toast { text-align:left; padding: 21px 0; background-color:#fff; border-radius:4px; max-width: 500px;top: 22px; position: relative; box-shadow: -2px -1px 20px 0px rgba(0, 0, 0, 0.2); } .toast:before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; border-top-left-radius:4px; border-bottom-left-radius: 4px; } .toast__icon{ position:absolute; top:50%; left:22px; transform:translateY(-50%); width:14px; height:14px; padding: 7px; border-radius:50%; display:inline-block; } .toast__type { color: #3e3e3e; font-weight: 700; margin-top: 0; margin-bottom: 8px; } .toast__message { font-size: 14px; margin-top: 0; margin-bottom: 0; color: #878787; } .toast__content{ padding-left:70px; padding-right:60px; } .toast__close { position: absolute; right: 22px; top: 50%; width: 14px; cursor:pointer; height: 14px; fill:#878787; transform: translateY(-50%); } .toast--green .toast__icon{ background-color:#2BDE3F; } .toast--green:before{ background-color:#2BDE3F; } .toast--blue .toast__icon{ background-color:#1D72F3; } .toast--blue:before{ background-color:#1D72F3; } .toast--yellow .toast__icon{ background-color:#FFC007; } .toast--yellow:before{ background-color:#FFC007; }
    </style>
    
    <div class="toast__cell" id="toast_cart">
      <div class="toast toast--green">
        <div class="toast__icon">
          <svg version="1.1" class="toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g><g><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"></path>
              </g></g>
          </svg>
        </div>
        <div class="toast__content">
          <p class="toast__type">Added To Cart!</p>
          <p class="toast__message" id="toast_discount_text"></p>
        </div>
        <div onClick="closeToast(this.event)" class="toast__close">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15.642 15.642">
            <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <script>
      function closeToast(e){
        document.getElementById("toast_cart").style.display = "none"
      };
    </script>
    
    <!--ShopLee Configuration Code End-->
`

    const updateTheme = await fetch(`${ShopURI}/admin/api/2020-04/themes/${themeID}/assets.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Shopify-Access-Token": accessT,
      },
      body: JSON.stringify({
        "asset": {
          "key": "snippets/shoplee-bundles.liquid",
          "value": uploadFile               
        }
      })
    });
  }

  module.exports = getThemes