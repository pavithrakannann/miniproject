// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "../styles/NavigationMap.css";

// function NavigationMap({ userLocation, shop }) {

//  if (!shop) return null;

//  return (

// <div className="navigation-map">

// <MapContainer
//  center={[shop.latitude, shop.longitude]}
//  zoom={15}
// >

// <TileLayer
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />

// <Marker position={userLocation} />
// <Marker position={[shop.latitude, shop.longitude]} />

// </MapContainer>

// </div>

//  );

// }

// export default NavigationMap;

// import React, { useMemo } from "react";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   useJsApiLoader
// } from "@react-google-maps/api";
// import "../styles/NavigationMap.css

import React, { useMemo } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";
import "../styles/NavigationMap.css";

function NavigationMap({ userLocation, shopLocation }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKwwSOBlMGkBNziQ1nj2rC6MbIZjiEJKU" // 🔥 replace this
  });

  const center = useMemo(() => {
    return userLocation || { lat: 11.0168, lng: 76.9558 }; // Coimbatore default
  }, [userLocation]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      center={center}
      zoom={13}
      mapContainerClassName="map-container"
    >

      {/* User Marker */}
      {userLocation && <Marker position={userLocation} />}

      {/* Shop Marker */}
      {shopLocation && <Marker position={shopLocation} />}

    </GoogleMap>
  );
}

export default NavigationMap;