

// import React from "react";
// import "../styles/CategoryPage.css";

// function Sidebar({ categories, selectedCategory, setSelectedCategory }) {
//   return (
//     <div>

//       <h2 style={{ marginBottom: "15px" }}>Categories</h2>

//       {categories.map((cat, index) => (
//         <div
//           key={index}
//           className={`category-card ${
//             selectedCategory === cat ? "active-category" : ""
//           }`}
//           onClick={() => setSelectedCategory(cat)}
//         >
//           {cat}
//         </div>
//       ))}

//     </div>
//   );
// }

// export default Sidebar;

import React from "react";
import "../styles/CategoryPage.css";

function Sidebar({ categories, selectedCategory, setSelectedCategory }) {

  return (
    <div>

      <h2 style={{ marginBottom: "15px" }}>Categories</h2>

      {/* 🔹 Show ALL option */}
      <div
        className={`category-card ${
          selectedCategory === null ? "active-category" : ""
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </div>

      {/* 🔹 Categories */}
      {categories.map((cat, index) => (
        <div
          key={index}
          className={`category-card ${
            selectedCategory === cat ? "active-category" : ""
          }`}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </div>
      ))}

    </div>
  );

}

export default Sidebar;