import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { addOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function paymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId

    const product = getProduct(productId)

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents
  })


  const cartQuantity = calculateCartQuantity()



  const totalBeforeTax = shippingPriceCents + productPriceCents;
  const taxCent = totalBeforeTax * 0.1;
  const totalPriceCents = totalBeforeTax + taxCent;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
    </div>
    
    <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>
    
    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>
    
    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>
    
    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCent)}</div>
            </div>
            
            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
            </div>
            
            <button class="place-order-button button-primary js-place-order">
            Place your order
            </button>
            `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async()=>{
   const response = await fetch('https:supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    })
    const order = await response.json();
    addOrder(order);
    
    const updatedCart = [];
    localStorage.setItem('carts',JSON.stringify(updatedCart));
    console.log("Cart has been cleared after order!");

    window.location.href = 'orders.html';
  });
};

