import React, { useState } from "react";
import CartModal from "./CartModal";

const ProductDetail = ({ productData }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCheackout, setShowCheckout] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    productData.colors[0].value
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setAmount((prev) => prev + 1);
    } else if (action === "decrement" && amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    const selectedSize = document.querySelector(
      ".sizes .size input:checked"
    ).value;
    const price = parseInt(productData.basePrice);

    const product = {
      name: productData.name,
      color: selectedColor,
      size: selectedSize,
      quantity: amount,
      price,
      total: amount * price,
      image: `public/${selectedColor}-watch.png`,
    };

    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.name === product.name &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        updatedCart[existingProductIndex].total += product.total;
        return updatedCart;
      }

      return [...prevCart, product];
    });
    setShowCheckout(true);
  };

  const renderRatings = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <img key={`full-${i}`} src="public/Vector.svg" alt="Full Star" />
        ))}
        {hasHalfStar && <img src="public/star-half-fill.svg" alt="Half Star" />}
        {[...Array(emptyStars)].map((_, i) => (
          <img key={`empty-${i}`} src="public/star.svg" alt="Empty Star" />
        ))}
      </>
    );
  };

  return (
    <div className="main">
      <div>
        <img
          id="product-image"
          src={`public/${selectedColor}-watch.png`}
          alt={productData.name}
          className="image"
        />
      </div>

      <div className="content">
        <h1 className="title">{productData.name}</h1>

        <div className="ratings">
          {renderRatings(productData.ratings)}({productData.reviews} Reviews)
        </div>

        <div className="price">
          <del>${productData.discountPrice.toFixed(2)}</del>
          <h2>${productData.basePrice.toFixed(2)}</h2>
        </div>

        <div className="description">
          <p>{productData.description}</p>
        </div>

        <div className="others">
          <div className="type">
            <label>Type</label>
            <h6>{productData.type}</h6>
          </div>
          <div className="model">
            <label>Model Number</label>
            <h6>{productData.model}</h6>
          </div>
        </div>
        <div className="colors">
          <h4>Band Color</h4>
          <div className="colorlist">
            {productData.colors.map((color, index) => (
              <label
                key={color.value}
                className={`color ${
                  selectedColor === color.value ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="color"
                  value={color.value}
                  checked={selectedColor === color.value}
                  onChange={() => handleColorChange(color.value)}
                />
                <span
                  style={{ backgroundColor: `var(--color-${color.value})` }}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="sizes">
          <h4>Wrist Size</h4>
          <div className="sizelist">
            {productData.sizes.map((size, index) => (
              <label key={size.name} className="size">
                <input
                  type="radio"
                  name="size"
                  value={size.name.toLowerCase()}
                  defaultChecked={index === 0}
                />
                <div className="size-price">
                  <span>{size.name}</span>
                  <span>${size.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="buttons">
          <div className="quantity">
            <button
              className="minus"
              onClick={() => handleQuantityChange("decrement")}
            >
              <img src="public/7 D.svg" alt="minus" />
            </button>
            <input
              type="number"
              min="1"
              className="amount"
              value={amount}
              readOnly
            />
            <button
              className="plus"
              onClick={() => handleQuantityChange("increment")}
            >
              <img src="public/3 M.svg" alt="plus" />
            </button>
          </div>
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="wishlist">
            <img src="public/heart.svg" alt="" />
          </button>
        </div>
      </div>
      {showCheackout && (
        <div className="checkout">
          <button
            className="checkout-button"
            onClick={() => setShowModal(true)}
          >
            Checkout <span>{cart.length}</span>
          </button>
        </div>
      )}
      {/* Modal Component */}
      {showModal && (
        <CartModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          cartItems={cart}
          onCheckout={() => {
            // Handle checkout logic here
            console.log("Proceeding to checkout");
          }}
        />
      )}
    </div>
  );
};

export default ProductDetail;
