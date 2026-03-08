import React from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import ShopList from "./components/ShopList";

function App() {

  return (

    <div>

      {/* Top Navigation */}
      <Navbar />

      {/* Map Section */}
      <MapView />

      {/* Shop List Section */}
      <ShopList />

    </div>

  );

}

export default App;