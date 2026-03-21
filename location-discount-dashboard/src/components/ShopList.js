import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ShopList.css";

function ShopList() {

  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [range, setRange] = useState(5);

  // Get user location
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

      });

    }

  }, []);

  // Fetch shops from backend
  useEffect(() => {

    axios.get("http://localhost:8080/api/store/all")
      .then(res => {

        const stores = res.data.map(store => ({
          ...store,
          latitude: Number(store.latitude),
          longitude: Number(store.longitude)
        }));

        setShops(stores);
        setFilteredShops(stores); // show shops before filtering

      })
      .catch(err => {
        console.error("Error fetching shops:", err);
      });

  }, []);

  // Distance calculation
  const getDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

  };

  // Filter shops based on range
  useEffect(() => {

    if (!userLocation) return;

    const nearby = shops
      .map(shop => {

        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          shop.latitude,
          shop.longitude
        );

        return {
          ...shop,
          distance: distance.toFixed(2)
        };

      })
      .filter(shop => shop.distance <= range);

    setFilteredShops(nearby);

  }, [range, shops, userLocation]);

  return (

    <div className="shop-section">

      <h2>Nearby Shops & Deals</h2>

      {/* Range Filter */}
      <div className="range-filter">

        <label>Distance Range:</label>

        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        >
          <option value={1}>1 KM</option>
          <option value={2}>2 KM</option>
          <option value={5}>5 KM</option>
          <option value={10}>10 KM</option>
          <option value={20}>20 KM</option>
        </select>

      </div>

      {/* Shop Cards */}

      <div className="shop-list">

        {filteredShops.length === 0 ? (

          <p>No shops within selected range</p>

        ) : (

          filteredShops.map(shop => (

            <div className="shop-card" key={shop.id}>

              <h3>{shop.name}</h3>

              <p>{shop.address}</p>

              <p className="distance">
                Distance: {shop.distance} km
              </p>

              <p className="category">
                Category: {shop.category}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default ShopList;