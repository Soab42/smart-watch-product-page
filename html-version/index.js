const productData = {
  id: 1,
  name: "Classy Modern Smart Watch",
  basePrice: 79.0,
  discountPrice: 99.0,
  description: `I must explain to you how all this mistaken idea of denoun cing
              ple praising pain was born and I will give you a complete account
              of the system, and expound the actual teaching.`,
  type: "Watch",
  model: "Forerunner 290XT",
  colors: [
    { name: "Purple", value: "purple", image: "public/purple-watch.png" },
    { name: "Cyan", value: "cyan", image: "public/cyan-watch.png" },
    { name: "Sky", value: "sky", image: "public/sky-watch.png" },
    { name: "Black", value: "black", image: "public/black-watch.png" },
  ],
  sizes: [
    { name: "S", price: 69 },
    { name: "M", price: 79 },
    { name: "L", price: 89 },
    { name: "XL", price: 99 },
  ],
  reviews: 2,
  ratings: 3.5,
  stock: 50,
};
const rootElement = document.getElementById("root");
const mainElement = document.getElementById("main");
renderProduct(productData);

// Selectors
const colorOptions = document.querySelectorAll(".colors .color input");
const productImage = document.getElementById("product-image");
// checkout modal selector
const checkoutButton = document.querySelector(".checkout-button");
const modal = document.querySelector(".modal");
const modalTable = document.querySelector(".product-table");
const modalTotalQuantity = modalTable.querySelector(
  ".table-footer td:nth-child(2)"
);
const modalTotalPrice = modalTable.querySelector(
  ".table-footer td:nth-child(3)"
);

const continueButton = document.querySelector(".continue-button");
const checkoutButton2 = document.querySelector(".checkout-button2");
const addToCartButton = document.querySelector(".buttons .add-to-cart");

// cart plus minus amount
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const amount = document.querySelector(".amount");

const cart = [];
// Add event listeners to each color option
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener("change", (event) => {
    const selectedColor = event.target.value;
    const newImageSrc = `public/${selectedColor}-watch.png`;

    // Update the product image
    productImage.src = newImageSrc;
  });
});

plus.addEventListener("click", () => {
  amount.value++;
});
minus.addEventListener("click", () => {
  if (amount.value <= 1) {
    amount.value = 1;
  } else {
    amount.value--;
  }
});

addToCartButton.addEventListener("click", () => {
  const selectedColor = document.querySelector(
    ".colors .color input:checked"
  ).value;
  const selectedSize = document.querySelector(
    ".sizes .size input:checked"
  ).value;
  const quantity = parseInt(amount.value, 10);
  const price = parseInt(
    document.querySelector(".price h2").textContent.replace("$", ""),
    10
  );

  // Add item to cart
  const product = {
    name: "Classy Modern Smart Watch",
    color: selectedColor,
    size: selectedSize,
    quantity,
    price,
    total: quantity * price,
    image: `public/${selectedColor}-watch.png`,
  };

  // Check if product already exists in the cart
  const existingProductIndex = cart.findIndex(
    (item) =>
      item.name === product.name &&
      item.color === product.color &&
      item.size === product.size
  );

  if (existingProductIndex >= 0) {
    // Update existing product quantity and total
    cart[existingProductIndex].quantity += product.quantity;
    cart[existingProductIndex].total += product.total;
  } else {
    // Add new product to the cart
    cart.push(product);
  }
  checkoutButton.classList.remove("hidden");
  checkoutButton.childNodes[1].innerHTML = cart.length;
});

checkoutButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
  checkoutButton.classList.add("hidden");
  updateModal();
});
continueButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  checkoutButton.classList.remove("hidden");
});
// Render Product Data
function renderProduct(data) {
  const productHTML = `
      <div class="image">
        <img id="product-image" src="${data.colors[0].image}" alt="${
    data.name
  }" />
      </div>
      <div class="content">
        <h1 class="title">${data.name}</h1>
        <div class="ratings">
          ${renderRatings(data.ratings)}
          (${data.reviews} Reviews)
        </div>
        <div class="price">
          <del>$${data.discountPrice.toFixed(2)}</del>
          <h2>$${data.basePrice.toFixed(2)}</h2>
        </div>
        <div class="description">
          <p>${data.description}</p>
        </div>
        <div class="others">
          <div class="type">
            <label>Type</label>
            <h6>${data.type}</h6>
          </div>
          <div class="model">
            <label>Model Number</label>
            <h6>${data.model}</h6>
          </div>
        </div>
        <div class="colors">
          <h4>Band Color</h4>
          <div class="colorlist">
            ${data.colors
              .map(
                (color, index) => `
              <label class="color ${index === 0 ? "active" : ""}">
                <input type="radio" name="color" value="${color.value}" ${
                  index === 0 ? "checked" : ""
                } />
                <span style="background-color: var(--color-${
                  color.value
                })"></span>
              </label>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="sizes">
          <h4>Wrist Size</h4>
          <div class="sizelist">
            ${data.sizes
              .map(
                (size, index) => `
              <label class="size">
                <input type="radio" name="size" value="${size.name.toLowerCase()}" ${
                  index === 0 ? "checked" : ""
                } />
                <div class="size-price"><span>${size.name}</span><span>$${
                  size.price
                }</span></div>
              </label>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="buttons">
          <div class="quantity">
            <button class="minus">
              <img src="public/7 D.svg" alt="minus" />
            </button>
            <input type='number' min="0" class="amount"/ value='1'>
            <button class="plus">
              <img src="public/3 M.svg" alt="plus" />
            </button>
          </div>
          <button class="add-to-cart">Add to Cart</button>
          <button class="wishlist">
            <img src="public/heart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

  `;

  mainElement.innerHTML = productHTML;
}
function renderRatings(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = "";

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<img src="public/Vector.svg" alt="Full Star" />`;
  }

  // Add half star if applicable
  if (hasHalfStar) {
    starsHTML += `<img src="public/star-half-fill.svg" alt="Half Star" />`;
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<img src="public/star.svg" alt="Empty Star" />`;
  }

  return starsHTML;
}

function updateModal() {
  const tableBody = modalTable.querySelector("tbody");
  tableBody.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");
    row.innerHTML = `
                    <td>
                        <div class="product-div">
                        <img src="${item.image}" width="35" alt="product" />
                        <p>${item.name}</p>
                        </div>
                    </td>
                    <td>${item.color}</td>
                    <td>${item.size}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.total.toFixed(2)}</td>
                    `;

    tableBody.appendChild(row);

    totalQuantity += item.quantity;
    totalPrice += item.total;
  });

  modalTotalQuantity.textContent = totalQuantity;
  modalTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}
