  // import React from "react";
  // import Navbar from "./components/Navbar";
  // import MapView from "./components/MapView";
  // import ShopList from "./components/ShopList";

  // function App() {

  //   return (

  //     <div>

  //       {/* Top Navigation */}
  //       <Navbar />

  //       {/* Map Section */}
  //       <MapView />

  //       {/* Shop List Section */}
  //       <ShopList />

  //     </div>

  //   );

  // }

  // export default App;


  import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import ShopList from "./components/ShopList";
import StoreOwnerDashboard from "./components/StoreOwnerDashboard";

function App() {

  return (

    <Router>

      {/* Top Navigation */}
      <Navbar />

      <Routes>

        {/* User Home Page */}
        <Route
          path="/"
          element={
            <>
              <MapView />
              <ShopList />
            </>
          }
        />

        {/* Store Owner Page */}
        <Route
          path="/owner"
          element={<StoreOwnerDashboard />}
        />

      </Routes>

    </Router>

  );

}

export default App;