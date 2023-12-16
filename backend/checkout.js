// dynamically import the carts and products data from their js file
import { cart } from '../data/carts.js';
import { products } from '../data/products.js';

let checkoutItemsHTML = '';


// now in the cart variable for each items run a foreach loop to find their all details and then create the HTML of checkout items
cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingpProduct;

    // now matching the id which is present in the cart variable to the id of products variable in the products.js
    products.forEach((product) => {
        if (product.id === productId) {
            matchingpProduct = product;
        };

    });
    
    // put this dynamic html structure in a variable
    checkoutItemsHTML = checkoutItemsHTML + `

        <div class="cart-item-container">
            <div class="delivery-date">
            Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingpProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingpProduct.name}
                </div>
                <div class="product-price">
                $${matchingpProduct.priceCents / 100}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
             `;


});

// now with use of queryselector add the HTML in DOM 
document.querySelector('.js-checkout-items')
    .innerHTML = checkoutItemsHTML;


