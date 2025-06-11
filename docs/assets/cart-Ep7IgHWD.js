import{l as o,g as n}from"./utils-DJxqsy3g.js";o();function s(){const a=n("so-cart")||[];if(a.length===0){document.querySelector(".product-list").innerHTML=`
      <div class="empty-cart-msg">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="/index.html" class="shop-now-button">Continue Shopping</a>
      </div>`;return}const t=a.map(r=>l(r));document.querySelector(".product-list").innerHTML=t.join("")}function l(a){var e,c;const t=a.quantity||1,r=(a.FinalPrice*t).toFixed(2);return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${a.Image}"
        alt="${a.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${a.Name}</h2>
    </a>
    <p class="cart-card__color">${((c=(e=a.Colors)==null?void 0:e[0])==null?void 0:c.ColorName)||"N/A"}</p>
    <p class="cart-card__quantity">qty: ${t}</p>
    <p class="cart-card__price">Total: $${r}</p>
  </li>`}s();
