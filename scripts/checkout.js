import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateCheckoutItem,
  updateTheQuantity,
  saveTheQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((item) => {
    if (item.id === productId) {
      matchingProduct = item;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src=${matchingProduct.image}
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${(
                  matchingProduct.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input">
                  <span class="save-quantity-link js-save-quantity-link" data-product-id-"${
                    matchingProduct.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

// console.log(cartSummaryHTML);

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
updateCheckoutItem();
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // console.log("delete");
    const productId = link.dataset.productId;
    // console.log(productId);
    removeFromCart(productId);
    console.log(cart);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCheckoutItem();
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const cartItemContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    // this function will make the input field visible
    updateTheQuantity(cartItemContainer);
    // this function will save the quantity when the user clicks on the save button
    saveTheQuantity(cartItemContainer);
  });
});
