import React from "react";
import "../styles/Navbar.css";

const distanceOptions = [
  { label: "Any distance", value: "all" },
  { label: "Within 1 km", value: "1" },
  { label: "Within 5 km", value: "5" },
  { label: "Within 10 km", value: "10" },
  { label: "Within 25 km", value: "25" },
];

function Navbar({
  categories,
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="filter-navbar">
      <div className="filter-navbar__group filter-navbar__group--search">
        <label htmlFor="shop-search">Search</label>
        <input
          id="shop-search"
          type="search"
          value={filters.search}
          onChange={(event) => onFilterChange("search", event.target.value)}
          placeholder="Search by shop name or address"
        />
      </div>

      <div className="filter-navbar__group">
        <label htmlFor="shop-category">Category</label>
        <select
          id="shop-category"
          value={filters.category}
          onChange={(event) => onFilterChange("category", event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-navbar__group">
        <label htmlFor="shop-distance">Distance</label>
        <select
          id="shop-distance"
          value={filters.distance}
          onChange={(event) => onFilterChange("distance", event.target.value)}
        >
          {distanceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-navbar__group filter-navbar__group--toggle">
        <label htmlFor="active-only">Offers</label>
        <button
          id="active-only"
          type="button"
          className={filters.activeOnly ? "toggle-chip toggle-chip--active" : "toggle-chip"}
          onClick={() => onFilterChange("activeOnly", !filters.activeOnly)}
        >
          {filters.activeOnly ? "Active only" : "Show all"}
        </button>
      </div>

      <button type="button" className="filter-navbar__reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default Navbar;
