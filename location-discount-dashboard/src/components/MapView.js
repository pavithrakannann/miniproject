import React, { useMemo } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../styles/MapView.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const fallbackCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

function hasCoordinates(shop) {
  return Number.isFinite(Number(shop.latitude)) && Number.isFinite(Number(shop.longitude));
}

function MapView({ shops, userLocation, selectedShop, onSelectShop }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });

  const center = useMemo(() => {
    if (selectedShop && hasCoordinates(selectedShop)) {
      return {
        lat: Number(selectedShop.latitude),
        lng: Number(selectedShop.longitude),
      };
    }

    if (userLocation) {
      return userLocation;
    }

    const firstShop = shops.find(hasCoordinates);
    if (firstShop) {
      return {
        lat: Number(firstShop.latitude),
        lng: Number(firstShop.longitude),
      };
    }

    return fallbackCenter;
  }, [selectedShop, shops, userLocation]);

  if (!apiKey) {
    return (
      <div className="map-placeholder">
        <h3>Google Maps key needed</h3>
        <p>Set `REACT_APP_GOOGLE_MAPS_API_KEY` in your frontend environment to enable the live map.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="map-placeholder">Loading map...</div>;
  }

  return (
    <div className="map-shell">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={{ streetViewControl: false, mapTypeControl: false }}>
        {userLocation ? (
          <Marker
            position={userLocation}
            title="Your location"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        ) : null}

        {shops.filter(hasCoordinates).map((shop) => (
          <Marker
            key={shop.id}
            position={{
              lat: Number(shop.latitude),
              lng: Number(shop.longitude),
            }}
            title={shop.name}
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            onClick={() => onSelectShop(shop)}
          />
        ))}

        {selectedShop && hasCoordinates(selectedShop) ? (
          <InfoWindow
            position={{
              lat: Number(selectedShop.latitude),
              lng: Number(selectedShop.longitude),
            }}
            onCloseClick={() => onSelectShop(null)}
          >
            <div className="map-info">
              <strong>{selectedShop.name}</strong>
              <span>{selectedShop.category}</span>
              <span>{selectedShop.address}</span>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapView;
