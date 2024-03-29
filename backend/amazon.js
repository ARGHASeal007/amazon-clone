import { cart, saveToStroge } from "../data/carts.js";
import { products } from "../data/products.js";

// combined the all product html in one variable to display this on page
let productsHTML = "";
let cartQuantity = cart.reduce((acc, eachItem) => {
  return acc + eachItem.quantity;
}, 0);
document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
products.forEach((product) => {
  productsHTML =
    productsHTML +
    `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="./images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
      </div>
      
      <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-select-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-add-msg-${product.id}">
      <img src="./images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
      product.id
    }">
      Add to Cart
    </button>
  </div>
    `;
});
// put all products on the page using innerHTML

document.querySelector(".js-all-products-grid").innerHTML = productsHTML;
// add a eventListiner for add to cart functionality
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    // Check if the element exists
    const cartMessageElement = document.querySelector(
      `.js-add-msg-${productId}`
    );

    if (cartMessageElement) {
      // Add the 'js-visible' class to show the message
      cartMessageElement.classList.add("js-visible");

      // Remove the 'js-visible' class after 2 seconds (2000 milliseconds)
      setTimeout(() => {
        cartMessageElement.classList.remove("js-visible");
      }, 2000);
    }

    //fetch and store the selected value of the product
    const productSelector = document.querySelector(
      `.js-quantity-select-${productId}`
    );
    const productSelectorVALUE = productSelector.value;
    console.log(productSelectorVALUE);

    // check if a same ID product already present on the cart
    let matchingitem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingitem = item;
      }
    });

    // if present then increase the quantity by 1
    if (matchingitem) {
      matchingitem.quantity = matchingitem.quantity + 1;
    } else {
      // else add the new product on the add to cart list
      cart.push({
        productId: productId,
        quantity: Number(productSelectorVALUE),
        deliveryOption: "1",
      });
    }

    saveToStroge();

    // // total the cart quantity
    let cartQuantity = cart.reduce((acc, eachItem) => {
      return acc + eachItem.quantity;
    }, 0);
    console.log(cartQuantity);
    // cart.forEach((item) => {
    //   cartQuantity = cartQuantity + item.quantity;
    // });

    // display the total quantity number on the website

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    console.log(cart);
  });
});
