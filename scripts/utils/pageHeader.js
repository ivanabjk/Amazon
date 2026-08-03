import { getTotalCartQuantity } from "../../data/cart.js";

export function updateCartQuantity() {
  const cartQuantity = getTotalCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}