// dynamically import the carts and products data from their js file
import { cart, removeCart } from "../data/carts.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let checkoutItemsHTML = "";

// now in the cart variable for each items run a foreach loop to find their all details and then create the HTML of checkout items
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingpProduct;

  // now matching the id which is present in the cart variable to the id of products variable in the products.js
  products.forEach((product) => {
    if (product.id === productId) {
      matchingpProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOption;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  // put this dynamic html structure in a variable
  checkoutItemsHTML =
    checkoutItemsHTML +
    `

    <div class="cart-item-container js-cart-item-${matchingpProduct.id}">
  <div class="delivery-date">Delivery date: ${dateString}</div>

  <div class="cart-item-details-grid">
    <img class="product-image" src="${matchingpProduct.image}" />

    <div class="cart-item-details">
      <div class="product-name">${matchingpProduct.name}</div>
      <div class="product-price">
        $${(matchingpProduct.priceCents / 100).toFixed(2)}
      </div>
      <div class="product-quantity">
        <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        <span class="update-quantity-link link-primary"> Update </span>
        <span
          class="delete-quantity-link link-primary js-delete-quantity-link"
          data-product-id="${matchingpProduct.id}"
        >
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>
      ${deliveryOptionHtml(matchingpProduct, cartItem)}
    </div>
  </div>
</div>
             `;

  updateCart();
});

function deliveryOptionHtml(matchingpProduct, cartItem) {
  let Html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE -"
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOption;

    Html += `<div class="delivery-option">
                    <input type="radio" ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingpProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                    </div>
                    </div>
    
    `;
  });

  return Html;
}

// now with use of queryselector add the HTML in DOM
document.querySelector(".js-checkout-items").innerHTML = checkoutItemsHTML;

// Function to update the cart and save it to local storage
export function updateCart() {
  // Your existing code to calculate the total quantity
  let checkoutCartQuantity = 0;

  cart.forEach((itemQuantity) => {
    checkoutCartQuantity += itemQuantity.quantity;
  });

  // Update the checkout total
  const updatecheckoutTotal = `${checkoutCartQuantity} items`;

  // Update the website display
  document.querySelector(".js-total-cartItems").innerHTML = updatecheckoutTotal;
}

// make the delete button functionable and then remove the product from the checkout page
document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeCart(productId);
    console.log(cart);
    const removeItem = document.querySelector(`.js-cart-item-${productId}`);
    removeItem.remove();
    updateCart();
  });
});
