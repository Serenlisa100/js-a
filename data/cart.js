export let cart;
 
function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('carts'));
if (!cart) {
    cart = [
        {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity: 2,
         deliveryOptionId: '1'
        },
        {
         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity: 1,
         deliveryOptionId: '2'
        }
    ];
}

}
loadFromStorage();

export function saveToStorage(){
    localStorage.setItem('carts',JSON.stringify(cart))
}

export function addToCart(productId) {
    const quantitySelector = document.querySelector(`.js-selected-quantity-${productId}`);
    const quantity = Number(quantitySelector.value);
    
    let matchingItem;
    cart.forEach((cartItem)=>{
        if (productId === cartItem.productId) {
          matchingItem = cartItem
        }
    });
    if (matchingItem) {
      matchingItem.quantity += quantity
    }else{
      cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      })
    }
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem)=>{
       if (productId !== cartItem.productId) {
         newCart.push(cartItem)
       }
    });

    cart = newCart;

    saveToStorage()
}
export function updateCartQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  });
 matchingItem.quantity = newQuantity;
 saveToStorage();

}

export function calculateCartQuantity() {
  let cartQuantity = 0

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity
  });

  return cartQuantity
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingProduct
    cart.forEach((cartItem)=>{
      if (productId === cartItem.productId) {
        matchingProduct = cartItem
      }
    });
    matchingProduct.deliveryOptionId = deliveryOptionId;

    saveToStorage()
}

export function loadCart(fun) {
 const xhr = new XMLHttpRequest();
 
 xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun()
})

 xhr.open('GET', 'https:supersimplebackend.dev/cart');
 xhr.send()
}
// loadCart()