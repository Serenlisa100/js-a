class Cart {
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey) {
      this.localStorageKey = localStorageKey;
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [
            {
                productId: 'id1',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: 'id2',
                quantity: 1,
                deliveryOptionId: '2'
            }
        ]
    };

    saveToStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems))
    };

    addToCart(productId) {

        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem
            }
        });
        if (matchingItem) {
            matchingItem.quantity += 1
        } else {
            this.cartItems.push({
                productId,
                quantity: 1,
                deliveryOptionId: '1'
            })
        }
    };

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (productId !== cartItem.productId) {
                newCart.push(cartItem)
            }
        });

        this.cartItems = newCart;

        this.saveToStorage()
    };

    updateCartQuantity(productId, newQuantity) {
        let matchingItem;

        cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem
            }
        });
        matchingItem.quantity = newQuantity;
        saveToStorage();

    };

    calculateCartQuantity() {
        let cartQuantity = 0

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity
        });

        return cartQuantity
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingProduct
        cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingProduct = cartItem
            }
        });
        matchingProduct.deliveryOptionId = deliveryOptionId;

        saveToStorage()
    }
};

const cart = new Cart();
cart.loadFromStorage();
console.log(cart);

const businessCart = new Cart();
businessCart.loadFromStorage();
businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
businessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(businessCart);

