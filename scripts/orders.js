import { orders } from "../data/orders.js";
import { getProduct, loadProductFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";

async function loadorderpage() {
  try {
    await loadProductFetch();

    renderOrderPage();
  } catch (error) {
    console.log(error);
  }
}
loadorderpage();

function renderOrderPage() {

  let orderSummaryHTML = '';
  orders.forEach((orderItem) => {
    // // Your date string from the backend
    // const dateStr = orderItem.orderTime;

    // // Convert the string to a Date object
    // const date = new Date(dateStr);

    // // Format the date to "November 6"
    // const options = { month: "long", day: "numeric" };
    // const formattedDate = date.toLocaleDateString("en-US", options);

    const orderDateString = dayjs(orderItem.orderTime).format('MMMM D')



    orderSummaryHTML += ` <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderItem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>
          
          ${displayOrderHTML(orderItem)}
         
          
        </div>`
  });
  document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML;

  function displayOrderHTML(orderItem) {
    let html = '';

    orderItem.products.forEach((orderProduct) => {
      const { productId } = orderProduct;

      let matchingProduct = getProduct(productId);

      // // Your date string from the backend
      // const dateStr = orderProduct.estimatedDeliveryTime;

      // // Convert the string to a Date object
      // const date = new Date(dateStr);

      // // Format the date to "November 6"
      // const options = { month: "long", day: "numeric" };
      // const formattedDeliveryDate = date.toLocaleDateString("en-US", options);
    
      const arriveDateString = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D')

      html += `<div class="order-details-grid">
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>
  
    <div class="product-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${arriveDateString}
      </div>
      <div class="product-quantity">
        Quantity: ${orderProduct.quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>
  
    <div class="product-actions">
      <a href="tracking.html?orderId=${orderItem.id}&productId=${productId}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  </div>`
    })
      ;

    return html
  }
}



