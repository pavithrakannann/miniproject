// import "../styles/ShopDetails.css";

// function ShopDetails({ shop }) {

// if (!shop) {
//  return <h3 className="select-text">Select a shop</h3>;
// }

// return (

// <div className="shop-details">

// <h2>{shop.name}</h2>

// <p>{shop.address}</p>

// <h4>Products</h4>

// <ul>

// {shop.products.map((product, index) => (

// <li key={index}>
// {product.name} - {product.discount}% OFF
// </li>

// ))}

// </ul>

// </div>

// );

// }

// export default ShopDetails;


import "../styles/ShopDetails.css";

function ShopDetails({ shop }) {

  // If no shop selected
  if (!shop) {
    return <h3 className="select-text">Select a shop</h3>;
  }

  return (

    <div className="shop-details">

      <h2>{shop.name}</h2>

      <p className="shop-address">{shop.address}</p>

      <h4>Products & Discounts</h4>

      <ul className="product-list">

        {shop.products && shop.products.length > 0 ? (

          shop.products.map((product, index) => (

            <li key={index} className="product-item">

              <span className="product-name">
                {product.name}
              </span>

              <span className="product-discount">
                {product.discount}% OFF
              </span>

            </li>

          ))

        ) : (

          <p>No products available</p>

        )}

      </ul>

    </div>

  );

}

export default ShopDetails;