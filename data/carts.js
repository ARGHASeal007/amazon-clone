export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
   cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 3
    }];
}

export function saveToStroge () {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// create remove item function
export function removeCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        };
    });

    cart = newCart;

    saveToStroge();
};