

// import React, { useEffect, useState } from "react";
// import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
// import "../styles/MapView.css";

// const containerStyle = {
//   width: "100%",
//   height: "500px"
// };

// const defaultCenter = {
//   lat: 11.0168,
//   lng: 76.9558
// };

// function MapView({ shops, setSelectedShop }) {

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBKwwSOBlMGkBNziQ1nj2rC6MbIZjiEJKU"
//   });

//   const [userLocation, setUserLocation] = useState(null);
//   const [directions, setDirections] = useState(null);

//   // Ask permission for location
//   useEffect(() => {

//     if (navigator.geolocation) {

//       navigator.geolocation.getCurrentPosition(
//         (position) => {

//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });

//         },
//         () => {
//           alert("Location permission denied");
//           setUserLocation(defaultCenter);
//         }
//       );

//     }

//   }, []);

//   // Show navigation route
//   const showRoute = (shop) => {

//     if (!userLocation) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: userLocation,
//         destination: {
//           lat: shop.latitude,
//           lng: shop.longitude
//         },
//         travelMode: window.google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {

//         if (status === "OK") {
//           setDirections(result);
//         }

//       }
//     );

//     setSelectedShop(shop);
//   };

//   if (!isLoaded) return <h3>Loading Map...</h3>;

//   return (

//     <div className="map-container">

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={userLocation || defaultCenter}
//         zoom={13}
//       >

//         {/* User Marker */}
//         {userLocation && (
//           <Marker
//             position={userLocation}
//             icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//           />
//         )}

//         {/* Shop Markers */}
//         {shops.map((shop) => (

//           <Marker
//             key={shop.id}
//             position={{
//               lat: shop.latitude,
//               lng: shop.longitude
//             }}
//             onClick={() => showRoute(shop)}
//           />

//         ))}

//         {/* Route */}
//         {directions && (
//           <DirectionsRenderer directions={directions} />
//         )}

//       </GoogleMap>

//     </div>

//   );
// }

// export default MapView;

// AIzaSyBKwwSOBlMGkBNziQ1nj2rC6MbIZjiEJKU

import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../styles/MapView.css";

const containerStyle = {
  width: "100%",
  height: "500px"
};

const defaultCenter = {
  lat: 11.0168,
  lng: 76.9558
};

function MapView({ setShops }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKwwSOBlMGkBNziQ1nj2rC6MbIZjiEJKU"
  });

  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [stores, setStores] = useState([]);

  // Get user location
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          setUserLocation(location);

        },
        (error) => {
          console.log("Location permission denied or unavailable", error);
        }
      );

    }

  }, []);

  // Fetch stores from backend
  useEffect(() => {

    axios.get("http://localhost:8080/api/store/all")
      .then((res) => {

        const formattedStores = res.data.map(store => ({
          ...store,
          latitude: Number(store.latitude),
          longitude: Number(store.longitude)
        }));

        setStores(formattedStores);

        // Send stores to parent (App.js)
        if (setShops) {
          setShops(formattedStores);
        }

      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
      });

  }, [setShops]);

  if (!isLoaded) {
    return <h3>Loading map...</h3>;
  }

  return (

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={13}
    >

      {/* User Location Marker */}
      <Marker
        position={userLocation}
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        title="Your Location"
      />

      {/* Store Markers */}
      {stores.map((store) => (

        <Marker
          key={store.id}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          title={store.name}
        />

      ))}

    </GoogleMap>

  );

}

export default MapView;