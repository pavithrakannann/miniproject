// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "../styles/StoreOwnerDashboard.css";

// // function StoreOwnerDashboard() {

// //   const [activeTab, setActiveTab] = useState("store");

// //   const [storeName, setStoreName] = useState("");
// //   const [storeCategory, setStoreCategory] = useState("");
// //   const [address, setAddress] = useState("");

// //   const [storeId, setStoreId] = useState(null);

// //   const [productName, setProductName] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [price, setPrice] = useState("");

// //   const [products, setProducts] = useState([]);

// //   // Load storeId from localStorage when page opens
// //   useEffect(() => {

// //     const savedStoreId = localStorage.getItem("storeId");

// //     if (savedStoreId) {
// //       setStoreId(savedStoreId);
// //     }

// //     fetchProducts();

// //   }, []);

// //   // ================================
// //   // FETCH PRODUCTS
// //   // ================================

// //   const fetchProducts = async () => {

// //     try {

// //       const res = await axios.get(
// //         "http://localhost:8080/products"
// //       );

// //       setProducts(res.data);

// //     } catch (error) {

// //       console.error("Error fetching products:", error);

// //     }

// //   };

// //   // ================================
// //   // ADD STORE
// //   // ================================

// //   const handleAddStore = async (e) => {

// //     e.preventDefault();

// //     const storeData = {

// //       name: storeName,
// //       category: storeCategory,
// //       address: address,
// //       latitude: 11.0018,
// //       longitude: 76.9628

// //     };

// //     try {

// //       const res = await axios.post(
// //         "http://localhost:8080/api/store/add",
// //         storeData
// //       );

// //       const newStoreId = res.data.id;

// //       setStoreId(newStoreId);

// //       localStorage.setItem("storeId", newStoreId);

// //       alert("Store Added Successfully!");

// //       setStoreName("");
// //       setStoreCategory("");
// //       setAddress("");

// //     } catch (error) {

// //       console.error("Error adding store:", error);

// //     }

// //   };

// //   // ================================
// //   // ADD PRODUCT
// //   // ================================

// //   const handleAddProduct = async (e) => {

// //     e.preventDefault();

// //     const savedStoreId = localStorage.getItem("storeId");

// //     if (!savedStoreId) {

// //       alert("Please add store first");

// //       return;

// //     }

// //     const productData = {

// //       productName: productName,
// //       category: category,
// //       price: price,
// //       storeId: savedStoreId

// //     };

// //     try {

// //       await axios.post(
// //         "http://localhost:8080/products",
// //         productData
// //       );

// //       alert("Product Added Successfully");

// //       setProductName("");
// //       setCategory("");
// //       setPrice("");

// //       fetchProducts();

// //     } catch (error) {

// //       console.error("Error adding product:", error);

// //     }

// //   };

// //   // ================================
// //   // DELETE PRODUCT
// //   // ================================

// //   const deleteProduct = async (id) => {

// //     try {

// //       await axios.delete(
// //         `http://localhost:8080/products/${id}`
// //       );

// //       fetchProducts();

// //     } catch (error) {

// //       console.error("Error deleting product:", error);

// //     }

// //   };

// //   return (

// //     <div className="dashboard-container">

// //       {/* Sidebar */}

// //       <div className="sidebar">

// //         <h3>Owner Panel</h3>

// //         <button onClick={() => setActiveTab("store")}>
// //           Store Details
// //         </button>

// //         <button onClick={() => setActiveTab("product")}>
// //           Products
// //         </button>

// //         <button onClick={() => setActiveTab("discount")}>
// //           Discounts
// //         </button>

// //         <button onClick={() => setActiveTab("deals")}>
// //           Active Deals
// //         </button>

// //       </div>

// //       {/* Main Content */}

// //       <div className="dashboard-content">

// //         {/* STORE FORM */}

// //         {activeTab === "store" && (

// //           <div>

// //             <h2>Add Store Details</h2>

// //             <form onSubmit={handleAddStore} className="store-form">

// //               <label>Store Name</label>

// //               <input
// //                 type="text"
// //                 value={storeName}
// //                 onChange={(e) => setStoreName(e.target.value)}
// //                 required
// //               />

// //               <label>Category</label>

// //               <input
// //                 type="text"
// //                 value={storeCategory}
// //                 onChange={(e) => setStoreCategory(e.target.value)}
// //                 required
// //               />

// //               <label>Address</label>

// //               <input
// //                 type="text"
// //                 value={address}
// //                 onChange={(e) => setAddress(e.target.value)}
// //                 required
// //               />

// //               <button type="submit">
// //                 Add Store
// //               </button>

// //             </form>

// //           </div>

// //         )}

// //         {/* PRODUCT MANAGEMENT */}

// //         {activeTab === "product" && (

// //           <div>

// //             <h2>Product Management</h2>

// //             <form onSubmit={handleAddProduct} className="product-form">

// //               <label>Product Name</label>

// //               <input
// //                 type="text"
// //                 value={productName}
// //                 onChange={(e) => setProductName(e.target.value)}
// //                 required
// //               />

// //               <label>Category</label>

// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 required
// //               >

// //                 <option value="">Select Category</option>
// //                 <option value="Biscuit">Biscuit</option>
// //                 <option value="Dairy">Dairy</option>
// //                 <option value="Beverages">Beverages</option>
// //                 <option value="Snacks">Snacks</option>

// //               </select>

// //               <label>Price</label>

// //               <input
// //                 type="number"
// //                 value={price}
// //                 onChange={(e) => setPrice(e.target.value)}
// //                 required
// //               />

// //               <button type="submit">
// //                 Add Product
// //               </button>

// //             </form>

// //             {/* PRODUCT TABLE */}

// //             <h3>Product List</h3>

// //             <table className="product-table">

// //               <thead>

// //                 <tr>

// //                   <th>Name</th>
// //                   <th>Category</th>
// //                   <th>Price</th>
// //                   <th>Action</th>

// //                 </tr>

// //               </thead>

// //               <tbody>

// //                 {products.map((product) => (

// //                   <tr key={product.id}>

// //                     <td>{product.productName}</td>
// //                     <td>{product.category}</td>
// //                     <td>{product.price}</td>

// //                     <td>

// //                       <button
// //                         onClick={() => deleteProduct(product.id)}
// //                       >
// //                         Delete
// //                       </button>

// //                     </td>

// //                   </tr>

// //                 ))}

// //               </tbody>

// //             </table>

// //           </div>

// //         )}

// //         {activeTab === "discount" && (

// //           <h2>Discount Management (Coming Soon)</h2>

// //         )}

// //         {activeTab === "deals" && (

// //           <h2>Active Deals (Coming Soon)</h2>

// //         )}

// //       </div>

// //     </div>

// //   );

// // }

// // export default StoreOwnerDashboard;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/StoreOwnerDashboard.css";
// import { useNavigate } from "react-router-dom";

// function StoreOwnerDashboard() {

//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("store");

//   const [stores, setStores] = useState([]);
//   const [selectedStore, setSelectedStore] = useState(null);

//   const [storeName, setStoreName] = useState("");
//   const [storeCategory, setStoreCategory] = useState("");
//   const [address, setAddress] = useState("");

//   // ==========================
//   // ✅ LOAD OWNER STORES
//   // ==========================
//   useEffect(() => {

//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     fetchStores(user.id);

//   }, []);

//   const fetchStores = async (userId) => {

//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/store/user/${userId}`
//       );

//       setStores(res.data);

//     } catch (error) {
//       console.error("Error fetching stores:", error);
//     }
//   };

//   // ==========================
//   // ✅ ADD STORE
//   // ==========================
//   const handleAddStore = async (e) => {

//     e.preventDefault();

//     const user = JSON.parse(localStorage.getItem("user"));

//     try {

//       const res = await axios.post(
//         `http://localhost:8080/api/store/add?userId=${user.id}`,
//         {
//           name: storeName,
//           category: storeCategory,
//           address: address
//         }
//       );

//       alert("Store Added Successfully!");

//       // refresh list
//       fetchStores(user.id);

//       // clear form
//       setStoreName("");
//       setStoreCategory("");
//       setAddress("");

//     } catch (error) {
//       console.error("Error adding store:", error);
//       alert("Failed to add store");
//     }

//   };

//   // ==========================
//   // ✅ SELECT STORE
//   // ==========================
//   const handleSelectStore = (store) => {
//     setSelectedStore(store);
//   };

//   // ==========================
//   // ✅ LOGOUT
//   // ==========================
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (

//     <div className="dashboard-container">

//       {/* SIDEBAR */}
//       <div className="sidebar">

//         <h3>Owner Panel</h3>

//         <button onClick={() => setActiveTab("store")}>
//           Stores
//         </button>

//         <button onClick={() => setActiveTab("manage")}>
//           Manage
//         </button>

//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>

//       </div>

//       {/* MAIN CONTENT */}
//       <div className="dashboard-content">

//         {/* ================= STORES ================= */}
//         {activeTab === "store" && (

//           <div>

//             <h2>Your Stores</h2>

//             {stores.length === 0 ? (
//               <p>No stores added yet</p>
//             ) : (

//               stores.map(store => (

//                 <div key={store.id} className="store-card">

//                   <h3>{store.name}</h3>
//                   <p>{store.category}</p>
//                   <p>{store.address}</p>

//                   <button onClick={() => handleSelectStore(store)}>
//                     Select
//                   </button>

//                 </div>

//               ))

//             )}

//             <hr />

//             {/* ADD STORE FORM */}
//             <h3>Add New Store</h3>

//             <form onSubmit={handleAddStore}>

//               <input
//                 type="text"
//                 placeholder="Store Name"
//                 value={storeName}
//                 onChange={(e) => setStoreName(e.target.value)}
//                 required
//               />

//               <input
//                 type="text"
//                 placeholder="Category (Salon / Shop / etc)"
//                 value={storeCategory}
//                 onChange={(e) => setStoreCategory(e.target.value)}
//                 required
//               />

//               <input
//                 type="text"
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />

//               <button type="submit">
//                 Add Store
//               </button>

//             </form>

//           </div>

//         )}

//         {/* ================= MANAGE ================= */}
//         {activeTab === "manage" && (

//           <div>

//             {!selectedStore ? (

//               <p>Please select a store first</p>

//             ) : (

//               <>
//                 <h2>Managing: {selectedStore.name}</h2>

//                 <p>Category: {selectedStore.category}</p>
//                 <p>Address: {selectedStore.address}</p>

//                 {/* FUTURE: ADD OFFERS HERE */}
//                 <p style={{ marginTop: "20px" }}>
//                   👉 Next: Add Offers (Products/Services)
//                 </p>

//               </>

//             )}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// }

// export default StoreOwnerDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StoreOwnerDashboard.css";

function StoreOwnerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  // Store form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  // Offer form
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [offerType, setOfferType] = useState("PRODUCT");

  const [offers, setOffers] = useState([]);

  const [activeTab, setActiveTab] = useState("stores");

  // ✅ LOAD STORES
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/store/user/${user.id}`
      );
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD STORE
  const handleAddStore = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/store/add?userId=${user.id}`,
        { name, category, address }
      );

      alert("Store added!");
      fetchStores();

      setName("");
      setCategory("");
      setAddress("");

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SELECT STORE
  const handleSelectStore = (store) => {
    setSelectedStore(store);
    fetchOffers(store.id);
    setActiveTab("manage");
  };

  // ✅ FETCH OFFERS
  const fetchOffers = async (storeId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/offers/store/${storeId}`
      );
      setOffers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ADD OFFER
  const handleAddOffer = async (e) => {
    e.preventDefault();

    if (!selectedStore) {
      alert("Select a store first!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/offers/${selectedStore.id}`,
        {
          title: offerTitle,
          description: offerDesc,
          originalPrice,
          discountPrice,
          type: offerType
        }
      );

      alert("Offer added!");

      fetchOffers(selectedStore.id);

      setOfferTitle("");
      setOfferDesc("");
      setOriginalPrice("");
      setDiscountPrice("");

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="owner-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Owner Panel</h2>

        <button onClick={() => setActiveTab("stores")}>
          Stores
        </button>

        <button onClick={() => setActiveTab("manage")}>
          Manage
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="content">

        {/* 🏪 STORES TAB */}
        {activeTab === "stores" && (
          <>
            <h2>Your Stores</h2>

            {stores.map(store => (
              <div key={store.id} className="store-card">
                <h3>{store.name}</h3>
                <p>{store.category}</p>
                <p>{store.address}</p>

                <button onClick={() => handleSelectStore(store)}>
                  Manage
                </button>
              </div>
            ))}

            <hr />

            <h2>Add Store</h2>

            <form onSubmit={handleAddStore}>
              <input
                placeholder="Store Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button>Add Store</button>
            </form>
          </>
        )}

        {/* 🛠 MANAGE TAB */}
        {activeTab === "manage" && selectedStore && (
          <>
            <h2>Managing: {selectedStore.name}</h2>

            <p>Category: {selectedStore.category}</p>
            <p>Address: {selectedStore.address}</p>

            <hr />

            {/* ADD OFFER */}
            <h3>Add Offer</h3>

            <form onSubmit={handleAddOffer}>

              <input
                placeholder="Title"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
              />

              <input
                placeholder="Description"
                value={offerDesc}
                onChange={(e) => setOfferDesc(e.target.value)}
              />

              <input
                type="number"
                placeholder="Original Price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder="Discount Price"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />

              <select
                value={offerType}
                onChange={(e) => setOfferType(e.target.value)}
              >
                <option value="PRODUCT">Product</option>
                <option value="SERVICE">Service</option>
              </select>

              <button>Add Offer</button>

            </form>

            <hr />

            {/* SHOW OFFERS */}
            <h3>Offers</h3>

            {offers.length === 0 ? (
              <p>No offers yet</p>
            ) : (
              offers.map(o => (
                <div key={o.id} className="offer-card">
                  <h4>{o.title}</h4>
                  <p>{o.description}</p>
                  <p>₹{o.originalPrice} → ₹{o.discountPrice}</p>
                  <p>{o.type}</p>
                </div>
              ))
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default StoreOwnerDashboard;