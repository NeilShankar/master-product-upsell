const mongoose = require("mongoose");

export default function DefaultLivePreview(Title, ProductTitle, ProductPrice, ProductImage, Product1Title, Product1Price, Product1Image, TotalPrice) {
  return `
    <h3 class='text-center text-muted'>${Title}</h3>
      <div class="container" style="margin: 19px 5px 0 5px;">
        <div class="grid-view-item product-card one" style="padding-left: 2%;max-width: 11em; margin: 0;">
          <a href="#">
            <img src="${ProductImage}" class="grid-view-item__link grid-view-item__image-container" alt="Product Image"> 
            <h4 class="h4 grid-view-item__title product-card__title">${ProductTitle}</h4>
            <p class="price price--listing">${ProductPrice}</p>
          </a>
        </div>
      <img src="https://image.flaticon.com/icons/svg/32/32339.svg" style="height: auto;width: 38px;margin-top: 8%;margin-left: 8%;">
      <div class="grid-view-item product-card two" style="max-width: 11em; margin: 0;">
        <a href="#">
          <img src="${Product1Image}" class="grid-view-item__link grid-view-item__image-container" alt="Product image 2">
          <h4 class="h4 grid-view-item__title product-card__title">${Product1Title}</h4>
          <p class="price price--listing">${Product1Price}</p>
        </a>
      </div>
    </div>
    <p style="display: block;min-width:24%;margin: 0 189px;margin-top: -10px;padding-left: 1%;margin-bottom:6px;font-weight: bold;color: #7b6a14;font-size: 13px;" class="price price--listing">${TotalPrice}</p>
    <button style="width: 50%;margin-left: 25%;" class="btn product-form__cart-submit btn--secondary-accent">Add Both To Cart </button><span id="free-ship-span" class="badge" style="background: bisque;  margin: 0 40%;  border-radius: 18px;    font-size: 12px;    font-family: inherit;    padding: 5px 14px; display: block; width: 24%;">Free Shipping</span>
  `
}