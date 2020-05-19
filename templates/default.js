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

    var uploadFile = `<div id="fbt_container"></div>                
    <div id="snack" style="display: none;">Added To Cart</div>`

    uploadFile = `${uploadFile}
    <script>
    var xmlhttp = new XMLHttpRequest();  
    var URL = "${process.env.HOST}/post-product/5ec0c8b74d757a187cd358ad";
    var gRes = ""
                      
    xmlhttp.onreadystatechange=function() {
      if (this.readyState == 4 && this.status == 200) {
        var Response = JSON.parse(this.responseText) 
        gRes = JSON.parse(this.responseText) 
        var Total = {{product.price | money_without_currency}} + Math.trunc(Response.Price)
        document.getElementById("fbt_container").innerHTML = 
    `
    uploadFile = `${uploadFile}` + "`" +
    "<h3 class='text-center text-muted'>${Response.PageTitle}</h3>"   +
    '<div class="container"> ' + 
    '<div class="grid-view-item product-card one" style="padding-left: 2%;max-width: 11em; margin: 0;">' +
    '<a href="{{ product.url }}">' +
    ' <img src="{{ product | img_url: "200x200" }}" class="grid-view-item__link grid-view-item__image-container" alt="{{ product.title }}">' +
    ' <h4 class="h4 grid-view-item__title product-card__title">{{ product.title }}</h4>' +
    ' <p class="price price--listing">{{ product.price | money_without_currency }} {{ shop.currency }}</p>' +
    ' </a>' +
    '</div>' +
    '<img src="https://image.flaticon.com/icons/svg/32/32339.svg" style="height: auto;width: 38px;margin-top: 8%;margin-left: 5%;">' +
    '<div class="grid-view-item product-card two" style="max-width: 11em; margin: 0;">' +
    '<a href="${Response.FoundProductUrl}">' +
    ' <img src="${Response.FoundImageUrl}" class="grid-view-item__link grid-view-item__image-container" alt="{{ product.title }}">' +
    '<h4 class="h4 grid-view-item__title product-card__title">${Response.FoundProductName}</h4>' +
    ' <p class="price price--listing">${Response.Price} {{ shop.currency }} </p>' +
    ' </a>' +
    '</div>' +
    '</div>' +
    '<p style="display: block;min-width:24%;padding-left: 1%;margin-bottom:10px;font-weight: bold;color: #7b6a14;font-size: 13px;" class="price price--listing">${Total} {{ shop.currency }}</p>' +


    '<button onClick="addToCart()" style="width: 50%;margin-left: 25%;" class="btn product-form__cart-submit btn--secondary-accent">' +
    'Add Both To Cart' +
    ' </button>' +

    '<span id="free-ship-span" class="badge" style="background: bisque;  margin: 0 40%;  border-radius: 18px;    font-size: 12px;    font-family: inherit;    padding: 5px 14px; display: none;">Free Shipping</span>' +

    "`" + ";" + "\n" +
    "if (Response.FreeShipEnable == true) { " + '\n'+
    " document.getElementById('free-ship-span').style.display = 'inline-block' " + '\n'+
    "if (Response.FreeShippingThres >= Total) {" + '\n'+
      ' document.getElementById("free-ship-span").style.display = "inline-block" ' + '\n' +
      " } else {" + '\n'+
        "   var ToGo = Total - Response.FreeShippingThres" + '\n'+
        '   document.getElementById("free-ship-span").innerHtml = `${ToGo} {{ shop.currency }} More For Free Shipping!`' + '\n'+
        ' document.getElementById("free-ship-span").style.display = "inline-block"' + '\n'+
        "  } " + '\n'+
      
        " }" + '\n'+
    
        " }" + '\n'+
        "};" + '\n'+

"function addToCart() {  " + '\n'    +                  
  "jQuery.ajax({" + '\n'+
    " type: 'POST'," + '\n'+
    " url: '/cart/add.js'," + '\n'+
    " data: { " + '\n'+
      "  items: [" + '\n'+
        "  {" + '\n'+
          "    quantity: 1," + '\n'+
          "  id: {{ product.variants.first.id }}" + '\n'+
          " }," + '\n'+
          " {" + '\n'+
            "  quantity: 1," + '\n'+
            " id: gRes.FoundVariantID" + '\n'+
            " },      " + '\n' +                   
            " ]" + '\n'+
      
            " }," + '\n'+
            " dataType: 'json',   " + '\n'  +     
            " success: function() {" + '\n'+
              "  showSnack()" + '\n'+
              " }," + '\n'+
              " error: function() {" + '\n'+
                "  alert('Oops! Something went wrong. Please try to add your product again. If this message persists, the item may not be available.');" + '\n'+
                " }" + '\n'+

                "});  " + '\n'+
                "}" + '\n'+

                "function showSnack() {" + '\n'+
                  "$('#snack').fadeIn(2000);" + '\n'+
                  "$('#snack').fadeOut(3000);" + '\n'+
                  "}" + '\n'+

                  "xmlhttp.open('POST', URL);" + '\n'+
                  "xmlhttp.setRequestHeader('Content-Type', 'application/json');" + '\n'+
                  "xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');" + '\n'+
"xmlhttp.send(JSON.stringify({" + '\n' +
'"productID": {{ product.id }}, ' + '\n'+
'"collectionID": {{ product.collections[0].id }},' + '\n'+
' "collectionSize": {{ product.collections[0].all_products.size }},' + '\n'+
'"Shop": `{{ shop.name }}.myshopify.com` ' + '\n'+
'}));' + '\n' + 

"//DO NOT MODIFY ANYTHING HERE//"+
"</script>"+

"<style>" + "\n" +
 " .container{width:80%;height:200px;margin:auto;padding:10px}.one{height:200px;float:left}.two{margin-left:15%;height:200px;float:right} #snackbar { visibility: hidden; min-width: 250px; margin-left: -125px; background-color: #333; color: #fff; text-align: center; border-radius: 2px; padding: 16px; position: fixed; z-index: 1; left: 50%; bottom: 30px; font-size: 17px; } #snackbar.show { visibility: visible; -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s; animation: fadein 0.5s, fadeout 0.5s 2.5s; } @-webkit-keyframes fadein { from {bottom: 0; opacity: 0;} to {bottom: 30px; opacity: 1;} } @keyframes fadein { from {bottom: 0; opacity: 0;} to {bottom: 30px; opacity: 1;} } @-webkit-keyframes fadeout { from {bottom: 30px; opacity: 1;} to {bottom: 0; opacity: 0;} } @keyframes fadeout { from {bottom: 30px; opacity: 1;} to {bottom: 0; opacity: 0;} } #snack{min-width: 250px; margin-left: -125px; background-color: #333; color: #fff; text-align: center; border-radius: 2px; padding: 16px; position: fixed; z-index: 1; left: 50%; font-size: 17px;}" + "\n" +
"</style>"


    

    const updateTheme = await fetch(`${ShopURI}/admin/api/2020-04/themes/${themeID}/assets.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Shopify-Access-Token": accessT,
      },
      body: JSON.stringify({
        "asset": {
          "key": "snippets/frequently-bought-products.liquid",
          "value": uploadFile               
        }
      })
    });

   console.log(updateTheme.json())

    
  }

  module.exports = getThemes