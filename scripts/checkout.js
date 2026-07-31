import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { cart, loadCart, getTotalCartQuantity } from "../data/cart.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";


async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

  } catch (error) {
    console.log(`${error} \nPlease try again.`);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();