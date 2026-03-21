import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/StoreOwnerDashboard.css";

function StoreOwnerDashboard() {

  const [activeTab, setActiveTab] = useState("store");

  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [address, setAddress] = useState("");

  const [storeId, setStoreId] = useState(null);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [products, setProducts] = useState([]);

  // Load storeId from localStorage when page opens
  useEffect(() => {

    const savedStoreId = localStorage.getItem("storeId");

    if (savedStoreId) {
      setStoreId(savedStoreId);
    }

    fetchProducts();

  }, []);

  // ================================
  // FETCH PRODUCTS
  // ================================

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/products"
      );

      setProducts(res.data);

    } catch (error) {

      console.error("Error fetching products:", error);

    }

  };

  // ================================
  // ADD STORE
  // ================================

  const handleAddStore = async (e) => {

    e.preventDefault();

    const storeData = {

      name: storeName,
      category: storeCategory,
      address: address,
      latitude: 11.0018,
      longitude: 76.9628

    };

    try {

      const res = await axios.post(
        "http://localhost:8080/api/store/add",
        storeData
      );

      const newStoreId = res.data.id;

      setStoreId(newStoreId);

      localStorage.setItem("storeId", newStoreId);

      alert("Store Added Successfully!");

      setStoreName("");
      setStoreCategory("");
      setAddress("");

    } catch (error) {

      console.error("Error adding store:", error);

    }

  };

  // ================================
  // ADD PRODUCT
  // ================================

  const handleAddProduct = async (e) => {

    e.preventDefault();

    const savedStoreId = localStorage.getItem("storeId");

    if (!savedStoreId) {

      alert("Please add store first");

      return;

    }

    const productData = {

      productName: productName,
      category: category,
      price: price,
      storeId: savedStoreId

    };

    try {

      await axios.post(
        "http://localhost:8080/products",
        productData
      );

      alert("Product Added Successfully");

      setProductName("");
      setCategory("");
      setPrice("");

      fetchProducts();

    } catch (error) {

      console.error("Error adding product:", error);

    }

  };

  // ================================
  // DELETE PRODUCT
  // ================================

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.error("Error deleting product:", error);

    }

  };

  return (

    <div className="dashboard-container">

      {/* Sidebar */}

      <div className="sidebar">

        <h3>Owner Panel</h3>

        <button onClick={() => setActiveTab("store")}>
          Store Details
        </button>

        <button onClick={() => setActiveTab("product")}>
          Products
        </button>

        <button onClick={() => setActiveTab("discount")}>
          Discounts
        </button>

        <button onClick={() => setActiveTab("deals")}>
          Active Deals
        </button>

      </div>

      {/* Main Content */}

      <div className="dashboard-content">

        {/* STORE FORM */}

        {activeTab === "store" && (

          <div>

            <h2>Add Store Details</h2>

            <form onSubmit={handleAddStore} className="store-form">

              <label>Store Name</label>

              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />

              <label>Category</label>

              <input
                type="text"
                value={storeCategory}
                onChange={(e) => setStoreCategory(e.target.value)}
                required
              />

              <label>Address</label>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <button type="submit">
                Add Store
              </button>

            </form>

          </div>

        )}

        {/* PRODUCT MANAGEMENT */}

        {activeTab === "product" && (

          <div>

            <h2>Product Management</h2>

            <form onSubmit={handleAddProduct} className="product-form">

              <label>Product Name</label>

              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />

              <label>Category</label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >

                <option value="">Select Category</option>
                <option value="Biscuit">Biscuit</option>
                <option value="Dairy">Dairy</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>

              </select>

              <label>Price</label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <button type="submit">
                Add Product
              </button>

            </form>

            {/* PRODUCT TABLE */}

            <h3>Product List</h3>

            <table className="product-table">

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr key={product.id}>

                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>

                    <td>

                      <button
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {activeTab === "discount" && (

          <h2>Discount Management (Coming Soon)</h2>

        )}

        {activeTab === "deals" && (

          <h2>Active Deals (Coming Soon)</h2>

        )}

      </div>

    </div>

  );

}

export default StoreOwnerDashboard;