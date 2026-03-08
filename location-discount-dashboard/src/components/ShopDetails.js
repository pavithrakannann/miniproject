import "../styles/ShopDetails.css";

function ShopDetails({ shop }) {

if (!shop) {
 return <h3 className="select-text">Select a shop</h3>;
}

return (

<div className="shop-details">

<h2>{shop.name}</h2>

<p>{shop.address}</p>

<h4>Products</h4>

<ul>

{shop.products.map((product, index) => (

<li key={index}>
{product.name} - {product.discount}% OFF
</li>

))}

</ul>

</div>

);

}

export default ShopDetails;