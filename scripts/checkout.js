import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { cart, loadCart, getTotalQuantity } from "../data/cart.js";

export function updateCartQuantity(){
  const cartQuantity = getTotalQuantity();

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}


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

  updateCartQuantity();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

// Promise.all([
//   loadProductsFetch(),

//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });


