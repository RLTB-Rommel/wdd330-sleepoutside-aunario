async function setupBrandCarousels() {
  const res = await fetch("json/brand-variants.json"); // adjust path if needed
  const brandProducts = await res.json();

  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const brand = card.dataset.brand;
    const variants = brandProducts[brand];
    if (!variants) return;

    const image = card.querySelector("img");
    const name = card.querySelector(".card__name");
    const price = card.querySelector(".product-card__price");
    const link = card.querySelector("a");
    const radios = card.querySelectorAll("input[type='radio']");

    radios.forEach((radio, i) => {
      radio.addEventListener("change", () => {
        const selected = variants[i];
        if (!selected) return;
        image.src = selected.image;
        name.textContent = selected.name;
        price.textContent = selected.price;
        link.href = `product_pages/?product=${selected.id}`;
      });
    });
  });
}

setupBrandCarousels();