async function cartSnippet(ctx) {
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
}

module.exports = cartSnippet