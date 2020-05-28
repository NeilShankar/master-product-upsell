const GetAllProduct = async (ctx) => {
    async function prods() {
        const products = await fetch(`https://${ctx.session.shop}/admin/api/2020-04/products.json`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ctx.session.accessToken,
            }
        })

        const productsJson = await products.json();

        var ProductInfo = []

        productsJson.products.forEach(element => {
            var ImageSrc = ""
            if (element["image"] != null) { 
                ImageSrc = element["image"]["src"] 
            } else {
                ImageSrc = "https://cynthiarenee.com/wp-content/uploads/2018/11/placeholder-product-image.png"
            }
            ProductInfo.push({
                "id": element.id,
                "title": element.title,
                "image": ImageSrc
            })
        })
        return ProductInfo
    }

    ctx.response.body = await prods()

}

module.exports = GetAllProduct