import { getOrder, orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductFetch } from "../data/products.js";

async function loadTrackingpage() {
    await loadProductFetch();
    renderTrackingPage();
}

function renderTrackingPage() {
    
const url = new URL(window.location.href);


const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


const matchingProduct = getProduct(productId);
const matchingOrder = getOrder(orderId);

let matchingDetails;
matchingOrder.products.forEach((orderProduct)=>{
  if (orderProduct.productId === matchingProduct.id) {
    matchingDetails = orderProduct;
  }
})

  const today = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
   
  const deliveredMessage = today < deliveryTime ? 'Arriving' : 'Delivered'
const trackingOrderHTML = `
 <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveredMessage} on ${dayjs(matchingDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
`
document.querySelector('.js-order-tracking').innerHTML = trackingOrderHTML;
};

loadTrackingpage();

