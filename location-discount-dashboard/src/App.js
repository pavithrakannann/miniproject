import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CategoryPage from "./components/CategoryPage";
import MapView from "./components/MapView";

function App() {

  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Fetch stores (ONLY API logic)
  useEffect(() => {
    axios.get("http://localhost:8080/api/store/all")
      .then(res => {

        const stores = res.data.map(store => ({
          ...store,
          latitude: Number(store.latitude),
          longitude: Number(store.longitude)
        }));

        setShops(stores);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(
            stores
              .map(store => store.category?.trim())
              .filter(cat => cat)
          )
        ];

        setCategories(uniqueCategories);

      })
      .catch(err => console.error("Error fetching stores:", err));
  }, []);

  return (

    <div className="app-container">

      {/* Navbar */}
      <Navbar />

      <div className="dashboard">

        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Main Content */}
        <div className="content">
          <CategoryPage
            shops={shops}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Map */}
        <div className="map-panel">
          <MapView shops={shops} />
        </div>

      </div>

    </div>

  );
}

export default App;

// import React, { useEffect, useState } from "react";
  // import "./App.css";
  // import axios from "axios";

  // import Navbar from "./components/Navbar";
  // import Sidebar from "./components/Sidebar";
  // import CategoryPage from "./components/CategoryPage";
  // import MapView from "./components/MapView";

  // function App() {

  //   const [shops, setShops] = useState([]);
  //   const [categories, setCategories] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState(null);

  //   // ✅ Fetch stores
  //   useEffect(() => {
  //     axios.get("http://localhost:8080/api/store/all")
  //       .then(res => {

  //         const stores = res.data;
  //         setShops(stores);

  //         const uniqueCategories = [
  //           ...new Set(
  //             stores
  //               .map(store => store.category?.trim())
  //               .filter(cat => cat)
  //           )
  //         ];

  //         setCategories(uniqueCategories);

  //       })
  //       .catch(err => console.error("Error fetching stores:", err));

  //   }, []);

  //   // ✅ FILTER LOGIC (MAIN FIX)
  //   const filteredShops = selectedCategory
  //     ? shops.filter(shop => shop.category === selectedCategory)
  //     : shops; // 👈 show ALL initially

  //   return (

  //     <div className="app-container">

  //       <Navbar />

  //       <div className="dashboard">

  //         {/* Sidebar */}
  //         <div className="sidebar">
  //           <Sidebar
  //             categories={categories}
  //             selectedCategory={selectedCategory}
  //             setSelectedCategory={setSelectedCategory}
  //           />
  //         </div>

  //         {/* Content */}
  //         <div className="content">
  //           <CategoryPage
  //             shops={filteredShops}   // ✅ FIXED
  //             selectedCategory={selectedCategory}
  //           />
  //         </div>

  //         {/* Map */}
  //         <div className="map-panel">
  //           <MapView shops={filteredShops} /> {/* ✅ also update map */}
  //         </div>

  //       </div>

  //     </div>

  //   );
  // }

  // export default App;
