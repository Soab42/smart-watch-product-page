import React from "react";

const CartModal = ({ isOpen, onClose, cartItems, onCheckout }) => {
  const calculateTotals = () => {
    return cartItems.reduce(
      (acc, item) => ({
        quantity: acc.quantity + item.quantity,
        price: acc.price + item.total,
      }),
      { quantity: 0, price: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className={`modal ${isOpen ? "" : "hidden"}`}>
      <div className="modal-content">
        <h1>Your Cart</h1>
        <table className="product-table">
          <thead>
            <tr className="table-header">
              <th>Item</th>
              <th>Color</th>
              <th>Size</th>
              <th>Qnt</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="table-row">
                <td>
                  <div className="product-div">
                    <img src={item.image} width="35" alt="product" />
                    <p>{item.name}</p>
                  </div>
                </td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tr className="table-footer">
            <td colSpan="3">Total</td>
            <td>{totals.quantity}</td>
            <td>${totals.price.toFixed(2)}</td>
          </tr>
        </table>
        <div className="modal-buttons">
          <button className="continue-button" onClick={onClose}>
            Continue Shopping
          </button>
          <button className="checkout-button2" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
