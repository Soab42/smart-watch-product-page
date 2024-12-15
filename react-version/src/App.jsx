import React from "react";
import ProductDetail from "./components/ProductDetail.jsx";
import pupleImage from "./assets/purple-watch.png";
import cyanImage from "./assets/cyan-watch.png";
import skyImage from "./assets/sky-watch.png";
import blackImage from "./assets/black-watch.png";

const App = () => {
  const productData = {
    id: 1,
    name: "Classy Modern Smart Watch",
    description: `I must explain to you how all this mistaken idea of denoun cing
              ple praising pain was born and I will give you a complete account
              of the system, and expound the actual teaching.`,
    type: "Watch",
    model: "Forerunner 290XT",
    colors: [
      { name: "Purple", value: "purple", image: pupleImage },
      { name: "Cyan", value: "cyan", image: cyanImage },
      { name: "Sky", value: "sky", image: skyImage },
      { name: "Black", value: "black", image: blackImage },
    ],
    sizes: [
      { name: "S", discountedPrice: 69, basePrice: 89 },
      { name: "M", discountedPrice: 79, basePrice: 99 },
      { name: "L", discountedPrice: 89, basePrice: 109 },
      { name: "XL", discountedPrice: 99, basePrice: 119 },
    ],
    reviews: 2,
    ratings: 3.5,
  };

  return (
    <div className="app">
      <ProductDetail productData={productData} />
    </div>
  );
};

export default App;
