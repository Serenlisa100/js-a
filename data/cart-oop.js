function Cart() {
    
    const cart = {
        cart: JSON.parse(localStorage.getItem('cart-oop')) || [
            {productId: 'id1',
             quantity: 2,
             deliveryOptionId: '1'
            },
            {
             productId: 'id2',
             quantity: 1,
             deliveryOptionId: '2'
            }
        ],
       
    
    
        saveToStorage(){
        localStorage.setItem('cart-oop',JSON.stringify(cart))
    },
    
    addToCart(productId) {
        
        let matchingItem;
        this.cart.forEach((cartItem)=>{
            if (productId === cartItem.productId) {
              matchingItem = cartItem
            }
        });
        if (matchingItem) {
          matchingItem.quantity += 1
        }else{
          this.cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
          })
        }
    },
    
    removeFromCart(productId) {
        const newCart = [];
        cart.forEach((cartItem)=>{
           if (productId !== cartItem.productId) {
             newCart.push(cartItem)
           }
        });
    
        cart = newCart;
    
        saveToStorage()
    },
    updateCartQuantity(productId, newQuantity) {
      let matchingItem;
    
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem
        }
      });
     matchingItem.quantity = newQuantity;
     saveToStorage();
    
    },
    
    calculateCartQuantity() {
      let cartQuantity = 0
    
      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity
      });
    
      return cartQuantity
    },
    
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingProduct
        cart.forEach((cartItem)=>{
          if (productId === cartItem.productId) {
            matchingProduct = cartItem
          }
        });
        matchingProduct.deliveryOptionId = deliveryOptionId;
    
        saveToStorage()
    }
    
    };

    return cart
}

const cart = Cart();
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
console.log(cart);

const businessCart = Cart();
businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
console.log(businessCart);

