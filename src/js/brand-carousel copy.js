const brandProducts = {
  "Marmot": [
    {
      id: "880RR",
      name: "Ajax Tent - 3-Person",
      price: "$199.99",
      image: "images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
    },
    {
      id: "880SS",
      name: "Tungsten Tent - 2-Person",
      price: "$179.99",
      image: "images/tents/marmot-tungsten-tent-2-person.jpg"
    },
    {
      id: "880TT",
      name: "Limelight Tent - 4-Person",
      price: "$219.99",
      image: "images/tents/marmot-limelight-tent-4-person.jpg"
    }
  ],
  "The North Face": [
    {
      id: "985RF",
      name: "Talus Tent - 4-Person",
      price: "$249.99",
      image: "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg"
    },
    {
      id: "985PR",
      name: "Alpine Guide Tent - 3-Person",
      price: "$349.99",
      image: "images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg"
    },
    {
      id: "985ZZ",
      name: "Stormbreak Tent - 2-Person",
      price: "$189.99",
      image: "images/tents/the-north-face-stormbreak-tent-2-person.jpg"
    }
  ],
  "Cedar Ridge": [
    {
      id: "344YJ",
      name: "Rimrock Tent - 2-Person",
      price: "$89.99",
      image: "images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg"
    },
    {
      id: "344YK",
      name: "Ironwood Tent - 3-Person",
      price: "$119.99",
      image: "images/tents/cedar-ridge-ironwood-tent-3-person.jpg"
    },
    {
      id: "344YL",
      name: "Timber Ridge Tent - 4-Person",
      price: "$139.99",
      image: "images/tents/cedar-ridge-timber-ridge-tent-4-person.jpg"
    }
  ],
  "Big Agnes": [
    {
      id: "123AB",
      name: "Copper Spur - 2-Person",
      price: "$329.99",
      image: "images/tents/big-agnes-copper-spur-2-person.jpg"
    },
    {
      id: "123AC",
      name: "Fly Creek - 1-Person",
      price: "$289.99",
      image: "images/tents/big-agnes-fly-creek-1-person.jpg"
    },
    {
      id: "123AD",
      name: "Tiger Wall - 3-Person",
      price: "$379.99",
      image: "images/tents/big-agnes-tiger-wall-3-person.jpg"
    }
  ]
};

function setupBrandCarousels() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card, index) => {
    const brand = card.dataset.brand;
    const variants = brandProducts[brand];
    const image = card.querySelector("img");
    const name = card.querySelector(".card__name");
    const price = card.querySelector(".product-card__price");
    const link = card.querySelector("a");
    const radios = card.querySelectorAll("input[type='radio']");

    radios.forEach((radio, i) => {
      radio.addEventListener("change", () => {
        const selected = variants[i];
        image.src = selected.image;
        name.textContent = selected.name;
        price.textContent = selected.price;
        link.href = `product_pages/?product=${selected.id}`;
      });
    });
  });
}

setupBrandCarousels();
