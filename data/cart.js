export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: "2",
    },
  ];
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionsId: "1",
    });
  }
  // console.log(quantity);
  // console.log(cart);
  saveToLocalStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}

export function updateCheckoutItem(items) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-return-to-home-link").innerHTML =
    cartQuantity === 0
      ? "0 item"
      : cartQuantity === 1
      ? "1 item"
      : `${cartQuantity} items`;
}

//! reminder: update and save is not working properly
export function updateTheQuantity(cartItemContainer) {
  const quantityInput = cartItemContainer.querySelector(".js-quantity-input");
  quantityInput.classList.add("quantity-input-visible");
  quantityInput.focus();
}

export function saveTheQuantity(cartItemContainer) {
  const saveLink = cartItemContainer.querySelector(".js-save-quantity-link");
  saveLink.classList.add("save-quantity-link-visible");

  // Remove any previous click listeners to avoid duplicates
  const newSaveLink = saveLink.cloneNode(true);
  saveLink.parentNode.replaceChild(newSaveLink, saveLink);

  newSaveLink.classList.add("save-quantity-link-visible");
  newSaveLink.addEventListener("click", () => {
    const quantityInput = cartItemContainer.querySelector(".js-quantity-input");
    const newQuantity = Number(quantityInput.value);
    const productId = cartItemContainer.dataset.productId;

    cart.forEach((item) => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
    });

    saveToLocalStorage();
    updateCartQuantity(); // This will update the cart quantity in the UI

    quantityInput.classList.remove("quantity-input-visible");
    newSaveLink.classList.remove("save-quantity-link-visible");
  });
}

export function updateDeliveryOption(productId, deliveryOptionsId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionsId = deliveryOptionsId;
    saveToLocalStorage();
  }
}
