import { cart, clearCart, getTotalCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { orders, addOrder } from "../../data/orders.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { renderOrderSummary } from "./orderSummary.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const totalQuantity = getTotalCartQuantity();

  const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button 
        button-primary
        js-place-order">
            Place your order
        </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order").addEventListener("click", () => {
    if (cart.length === 0 || getTotalCartQuantity() === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    const order = {
      id: crypto.randomUUID(),
      orderTime: new Date().toISOString(),
      products: cart.map((cartItem) => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          variation: null,
          estimatedDeliveryTime: calculateDeliveryDate(deliveryOption),
        };
      }),
      totalCostCents: totalCents,
    };

    addOrder(order);
    clearCart();

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

    // window.location.href = "orders.html";

    // Display popup
    document.querySelector(".js-order-popup").style.display = "flex";

    document.querySelector(".js-check-orders").addEventListener("click", () => {
      window.location.href = "orders.html";
    });
    document
      .querySelector(".js-back-to-amazon")
      .addEventListener("click", () => {
        window.location.href = "amazon.html";
      });

    document.querySelector(".popup-close").addEventListener("click", () => {
      document.querySelector(".js-order-popup").style.display = "none";
    });
  });
}
