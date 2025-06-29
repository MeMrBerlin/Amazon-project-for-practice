import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalCents = 0;
  let totalBeforeTax = 0;
  let taxCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((item) => {
      if (item.id === productId) {
        matchingProduct = item;
      }
    });

    const deliveryOptionsId = cartItem.deliveryOptionsId;
    let deliveryOption;
    deliveryOptions.forEach((item) => {
      if (item.id === deliveryOptionsId) {
        deliveryOption = item;
      }
    });

    productPriceCents += (matchingProduct.priceCents * cartItem.quantity) / 100;
    shippingPriceCents += deliveryOption.priceCents / 100;

    totalBeforeTax = productPriceCents + shippingPriceCents;
    taxCents = totalBeforeTax * 0.1;
    totalCents = Math.round(totalBeforeTax + taxCents).toFixed(2);
  });
  //   console.log(productPriceCents);
  //   console.log(shippingPriceCents);
  //   console.log(totalCents);

  const paymentHTML = `
  <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${productPriceCents.toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingPriceCents}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax.toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxCents.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalCents}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;
}
