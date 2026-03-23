// // //   // import React from "react";
// // //   // import Navbar from "./components/Navbar";
// // //   // import MapView from "./components/MapView";
// // //   // import ShopList from "./components/ShopList";

// // //   // function App() {

// // //   //   return (

// // //   //     <div>

// // //   //       {/* Top Navigation */}
// // //   //       <Navbar />

// // //   //       {/* Map Section */}
// // //   //       <MapView />

// // //   //       {/* Shop List Section */}
// // //   //       <ShopList />

// // //   //     </div>

// // //   //   );

// // //   // }

// // //   // export default App;


// // //   import React from "react";
// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // // import Navbar from "./components/Navbar";
// // // import MapView from "./components/MapView";
// // // import ShopList from "./components/ShopList";
// // // import StoreOwnerDashboard from "./components/StoreOwnerDashboard";

// // // function App() {

// // //   return (

// // //     <Router>

// // //       {/* Top Navigation */}
// // //       <Navbar />

// // //       <Routes>

// // //         {/* User Home Page */}
// // //         <Route
// // //           path="/"
// // //           element={
// // //             <>
// // //               <MapView />
// // //               <ShopList />
// // //             </>
// // //           }
// // //         />

// // //         {/* Store Owner Page */}
// // //         <Route
// // //           path="/owner"
// // //           element={<StoreOwnerDashboard />}
// // //         />

// // //       </Routes>

// // //     </Router>

// // //   );

// // // }

// // // export default App;
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // // import Login from "./components/Login";
// // // import Register from "./components/Register";
// // // import StoreOwnerDashboard from "./components/StoreOwnerDashboard";
// // // import MapView from "./components/MapView";
// // // import ShopList from "./components/ShopList";

// // // function App() {

// // //   const user = JSON.parse(localStorage.getItem("user"));

// // //   return (

// // //     <Router>

// // //       <Routes>

// // //         {/* Default route */}
// // //         <Route
// // //           path="/"
// // //           element={
// // //             user
// // //               ? user.role === "OWNER"
// // //                 ? <Navigate to="/owner" />
// // //                 : <Navigate to="/home" />
// // //               : <Navigate to="/login" />
// // //           }
// // //         />

// // //         {/* Auth */}
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/register" element={<Register />} />

// // //         {/* User Dashboard */}
// // //         <Route
// // //           path="/home"
// // //           element={
// // //             <>
// // //               <MapView />
// // //               <ShopList />
// // //             </>
// // //           }
// // //         />

// // //         {/* Owner Dashboard */}
// // //         <Route path="/owner" element={<StoreOwnerDashboard />} />

// // //       </Routes>

// // //     </Router>

// // //   );

// // // }

// // // export default App;

// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // import Login from "./components/Login";
// // import Register from "./components/Register";
// // import StoreOwnerDashboard from "./components/StoreOwnerDashboard";
// // import MapView from "./components/MapView";
// // import ShopList from "./components/ShopList";

// // function App() {

// //   const user = JSON.parse(localStorage.getItem("user"));

// //   return (

// //     <Router>

// //       <Routes>

// //         {/* ✅ Default → Login ALWAYS */}
// //         <Route path="/" element={<Navigate to="/login" />} />

// //         {/* ✅ Login */}
// //         <Route path="/login" element={<Login />} />

// //         {/* ✅ Register */}
// //         <Route path="/register" element={<Register />} />

// //         {/* ✅ USER DASHBOARD */}
// //         <Route
// //           path="/home"
// //           element={
// //             user
// //               ? user.role === "USER"
// //                 ? (
// //                     <>
// //                       <MapView />
// //                       <ShopList />
// //                     </>
// //                   )
// //                 : <Navigate to="/owner" />
// //               : <Navigate to="/login" />
// //           }
// //         />

// //         {/* ✅ OWNER DASHBOARD */}
// //         <Route
// //           path="/owner"
// //           element={
// //             user
// //               ? user.role === "OWNER"
// //                 ? <StoreOwnerDashboard />
// //                 : <Navigate to="/home" />
// //               : <Navigate to="/login" />
// //           }
// //         />

// //       </Routes>

// //     </Router>

// //   );

// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import StoreOwnerDashboard from "./components/StoreOwnerDashboard";
// import MapView from "./components/MapView";
// import ShopList from "./components/ShopList";

// function App() {

//   const user = JSON.parse(localStorage.getItem("user"));

//   return (

//     <Router>

//       <Routes>

//         {/* ✅ Default → Always Login */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* ✅ Login Page */}
//         <Route path="/login" element={<Login />} />

//         {/* ✅ Register Page */}
//         <Route path="/register" element={<Register />} />

//         {/* ✅ USER DASHBOARD (Protected) */}
//         <Route
//           path="/home"
//           element={
//             user
//               ? user.role === "USER"
//                 ? (
//                     <>
//                       <MapView />
//                       <ShopList />
//                     </>
//                   )
//                 : <Navigate to="/owner" />
//               : <Navigate to="/login" />
//           }
//         />

//         {/* ✅ OWNER DASHBOARD (Protected) */}
//         <Route
//           path="/owner"
//           element={
//             user
//               ? user.role === "OWNER"
//                 ? <StoreOwnerDashboard />
//                 : <Navigate to="/home" />
//               : <Navigate to="/login" />
//           }
//         />

//         {/* ✅ Unknown route fallback */}
//         <Route path="*" element={<Navigate to="/login" />} />

//       </Routes>

//     </Router>

//   );

// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import StoreOwnerDashboard from "./components/StoreOwnerDashboard";
import MapView from "./components/MapView";
import ShopList from "./components/ShopList";

function App() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <Router>

      <Routes>

        {/* ✅ ALWAYS START WITH LOGIN */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ✅ REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* ✅ USER DASHBOARD */}
        <Route
          path="/home"
          element={
            user
              ? user.role === "USER"
                ? (
                    <div>
                      <MapView />
                      <ShopList />
                    </div>
                  )
                : <Navigate to="/owner" />
              : <Navigate to="/login" />
          }
        />

        {/* ✅ OWNER DASHBOARD */}
        <Route
          path="/owner"
          element={
            user
              ? user.role === "OWNER"
                ? <StoreOwnerDashboard />
                : <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* ✅ FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

    </Router>

  );

}

export default App;