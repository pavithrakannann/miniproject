// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/CategoryPage.css";

// function CategoryPage({ shops, selectedCategory }) {

//   const [selectedShop, setSelectedShop] = useState(null);
//   const [offers, setOffers] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [distanceRange, setDistanceRange] = useState(5);
//   const [searchText, setSearchText] = useState("");

//   // 📍 Get user location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (err) => console.error("Location error:", err)
//     );
//   }, []);

//   // 📏 Distance calculation
//   const getDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;

//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;

//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(lat1 * Math.PI / 180) *
//       Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // 🔥 FILTER LOGIC (distance + category + search)
//   const filteredShops = shops
//     .map(shop => {
//       if (!userLocation) return shop;

//       const distance = getDistance(
//         userLocation.lat,
//         userLocation.lng,
//         Number(shop.latitude),
//         Number(shop.longitude)
//       );

//       return {
//         ...shop,
//         distance: Number(distance.toFixed(2))
//       };
//     })
//     .filter(shop => {

//       // 📏 Distance filter
//       if (userLocation && distanceRange) {
//         if (shop.distance > distanceRange) return false;
//       }

//       // 🗂 Category filter
//       if (selectedCategory) {
//         if (
//           shop.category?.toLowerCase() !==
//           selectedCategory.toLowerCase()
//         ) return false;
//       }

//       // 🔍 Search filter
//       if (searchText) {
//         if (
//           !shop.name.toLowerCase().includes(searchText.toLowerCase())
//         ) return false;
//       }

//       return true;
//     })
//     .sort((a, b) => (a.distance || 0) - (b.distance || 0)); // nearest first

//   // 🎯 Fetch offers
//   const handleShopClick = (shop) => {
//     setSelectedShop(shop);

//     axios.get(`http://localhost:8080/api/offers/store/${shop.id}`)
//       .then(res => setOffers(res.data))
//       .catch(() => setOffers([]));
//   };

//   return (

//     <div className="category-container">

//       {/* 🔍 Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="🔍 Search shops..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>

//       {/* 📏 Distance Filter */}
//       <div className="distance-filter">
//         <label>📏 Distance:</label>

//         <select
//           value={distanceRange}
//           onChange={(e) => setDistanceRange(Number(e.target.value))}
//         >
//           <option value={1}>1 KM</option>
//           <option value={2}>2 KM</option>
//           <option value={5}>5 KM</option>
//           <option value={10}>10 KM</option>
//           <option value={20}>20 KM</option>
//         </select>
//       </div>

//       {/* 🔹 Title */}
//       <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
//         {selectedCategory
//           ? `🏪 Shops in "${selectedCategory}"`
//           : "🏪 All Shops"}
//       </h3>

//       {/* 🏪 Shop List */}
//       <div className="shop-list">

//         {filteredShops.length === 0 ? (
//           <p>😔 No shops found</p>
//         ) : (
//           filteredShops.map(shop => (

//             <div
//               key={shop.id}
//               className={`shop-card ${
//                 selectedShop?.id === shop.id ? "active-shop" : ""
//               }`}
//               onClick={() => handleShopClick(shop)}
//             >
//               <h4>🏪 {shop.name}</h4>
//               <p>📍 {shop.address}</p>

//               {shop.distance && (
//                 <p className="distance">
//                   📏 {shop.distance} km away
//                 </p>
//               )}

//               <p>🏷 {shop.category}</p>

//             </div>

//           ))
//         )}

//       </div>

//       {/* 🔥 Offers */}
//       {selectedShop && (
//         <>
//           <h3 style={{ marginTop: "25px" }}>
//             🔥 Offers in "{selectedShop.name}"
//           </h3>

//           <div className="offer-list">

//             {offers.length === 0 ? (
//               <p>😕 No offers available</p>
//             ) : (
//               offers.map(offer => (

//                 <div key={offer.id} className="offer-card">
//                   <h4>🔥 {offer.title}</h4>
//                   <p>{offer.description}</p>
//                   <p>🏷 {offer.type}</p>
//                 </div>

//               ))
//             )}

//           </div>
//         </>
//       )}

//     </div>

//   );

// }

// export default CategoryPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CategoryPage.css";

function CategoryPage({ shops, selectedCategory }) {

  const [selectedShop, setSelectedShop] = useState(null);
  const [offers, setOffers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceRange, setDistanceRange] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // 📍 Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("Location error:", err)
    );
  }, []);

  // 📏 Distance calculation
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // 🔥 FILTER LOGIC
  const filteredShops = shops
    .map(shop => {
      if (!userLocation) return shop;

      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        Number(shop.latitude),
        Number(shop.longitude)
      );

      return {
        ...shop,
        distance: Number(distance.toFixed(2))
      };
    })
    .filter(shop => {

      if (userLocation && distanceRange) {
        if (shop.distance > distanceRange) return false;
      }

      if (selectedCategory) {
        if (
          shop.category?.toLowerCase() !==
          selectedCategory.toLowerCase()
        ) return false;
      }

      if (searchText) {
        if (
          !shop.name.toLowerCase().includes(searchText.toLowerCase())
        ) return false;
      }

      return true;
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  // 🎯 Handle shop click
  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setShowPopup(true);

    axios.get(`http://localhost:8080/api/offers/store/${shop.id}`)
      .then(res => setOffers(res.data))
      .catch(() => setOffers([]));
  };

  return (

    <div className="category-container">

      {/* 🔍 Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search shops..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 📏 Distance */}
      <div className="distance-filter">
        <label>📏 Distance:</label>
        <select
          value={distanceRange}
          onChange={(e) => setDistanceRange(Number(e.target.value))}
        >
          <option value={1}>1 KM</option>
          <option value={2}>2 KM</option>
          <option value={5}>5 KM</option>
          <option value={10}>10 KM</option>
          <option value={20}>20 KM</option>
        </select>
      </div>

      {/* 🔹 Title */}
      <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
        {selectedCategory
          ? `🏪 Shops in "${selectedCategory}"`
          : "🏪 All Shops"}
      </h3>

      {/* 🏪 Shop List */}
      <div className="shop-list">

        {filteredShops.length === 0 ? (
          <p>😔 No shops found</p>
        ) : (
          filteredShops.map(shop => (

            <div
              key={shop.id}
              className={`shop-card ${
                selectedShop?.id === shop.id ? "active-shop" : ""
              }`}
              onClick={() => handleShopClick(shop)}
            >
              <h4>🏪 {shop.name}</h4>
              <p>📍 {shop.address}</p>

              {shop.distance && (
                <p className="distance">
                  📏 {shop.distance} km away
                </p>
              )}

              <p>🏷 {shop.category}</p>

            </div>

          ))
        )}

      </div>

      {/* 🔥 POPUP ONLY (NO BOTTOM SECTION) */}
      {showPopup && selectedShop && (
        <div
          className="offer-popup"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >

            <span
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              ❌
            </span>

            <h3>🔥 {selectedShop.name}</h3>

            {offers.length === 0 ? (
              <p>😕 No offers available</p>
            ) : (
              offers.map(offer => (
                <div key={offer.id} className="offer-card">
                  <h4>🔥 {offer.title}</h4>
                  <p>{offer.description}</p>
                  <p>🏷 {offer.type}</p>
                </div>
              ))
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default CategoryPage;