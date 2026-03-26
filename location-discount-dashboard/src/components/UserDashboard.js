import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "./MapView";
import Navbar from "./Navbar";
import { getOffersByShop } from "../services/offerService";
import { getAllShops } from "../services/shopService";
import { clearStoredUser, getStoredUser } from "../utils/auth";
import "../styles/UserDashboard.css";

function formatDistance(distanceKm) {
  if (distanceKm == null) {
    return "Distance unavailable";
  }

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }

  return `${distanceKm.toFixed(1)} km away`;
}

function formatOfferDate(label, value, fallback) {
  return value ? `${label} ${value}` : fallback;
}

function haversineDistance(first, second) {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(second.lat - first.lat);
  const deltaLng = toRadians(second.lng - first.lng);
  const lat1 = toRadians(first.lat);
  const lat2 = toRadians(second.lat);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function UserDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [offers, setOffers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    distance: "all",
    activeOnly: true,
  });

  useEffect(() => {
    async function loadShops() {
      try {
        setIsLoading(true);
        const response = await getAllShops();
        setShops(response);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load nearby shops.");
      } finally {
        setIsLoading(false);
      }
    }

    loadShops();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return undefined;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => undefined
    );

    return undefined;
  }, []);

  const categories = useMemo(
    () => [...new Set(shops.map((shop) => shop.category).filter(Boolean))].sort(),
    [shops]
  );

  const filteredShops = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();
    const maxDistance = filters.distance === "all" ? null : Number(filters.distance);

    return shops
      .map((shop) => {
        const hasCoordinates =
          Number.isFinite(Number(shop.latitude)) && Number.isFinite(Number(shop.longitude));

        const distanceKm =
          userLocation && hasCoordinates
            ? haversineDistance(userLocation, {
                lat: Number(shop.latitude),
                lng: Number(shop.longitude),
              })
            : null;

        return {
          ...shop,
          distanceKm,
        };
      })
      .filter((shop) => {
        const matchesSearch =
          !normalizedSearch ||
          shop.name?.toLowerCase().includes(normalizedSearch) ||
          shop.address?.toLowerCase().includes(normalizedSearch);
        const matchesCategory = filters.category === "all" || shop.category === filters.category;
        const matchesDistance = maxDistance == null || (shop.distanceKm != null && shop.distanceKm <= maxDistance);

        return matchesSearch && matchesCategory && matchesDistance;
      })
      .sort((left, right) => {
        if (left.distanceKm == null && right.distanceKm == null) {
          return left.name.localeCompare(right.name);
        }

        if (left.distanceKm == null) {
          return 1;
        }

        if (right.distanceKm == null) {
          return -1;
        }

        return left.distanceKm - right.distanceKm;
      });
  }, [filters, shops, userLocation]);

  const nearestShops = filteredShops.filter((shop) => shop.distanceKm != null).slice(0, 3);

  useEffect(() => {
    if (!selectedShop) {
      return;
    }

    const updatedShop = filteredShops.find((shop) => shop.id === selectedShop.id)
      || shops.find((shop) => shop.id === selectedShop.id);

    if (updatedShop) {
      setSelectedShop(updatedShop);
    }
  }, [filteredShops, shops, selectedShop]);

  useEffect(() => {
    async function loadOffers() {
      if (!selectedShop) {
        setOffers([]);
        return;
      }

      try {
        setOffersLoading(true);
        const response = await getOffersByShop(selectedShop.id, filters.activeOnly);
        setOffers(response);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load offers for this shop.");
      } finally {
        setOffersLoading(false);
      }
    }

    loadOffers();
  }, [filters.activeOnly, selectedShop]);

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
  };

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      distance: "all",
      activeOnly: true,
    });
  };

  const handleLogout = () => {
    clearStoredUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero">
        <div>
          <span className="dashboard-kicker">Offer Hunt</span>
          <h1>Nearby discounts tailored to where you are.</h1>
          <p>Search, filter, and compare local deals across categories with map-first discovery.</p>
        </div>

        <div className="dashboard-hero__actions">
          <div className="user-pill">
            <strong>{user?.name}</strong>
            <span>{user?.role === "USER" ? "Shopper dashboard" : user?.role}</span>
          </div>
          <button type="button" className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <Navbar categories={categories} filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />

      {error ? <div className="status-banner status-banner--error">{error}</div> : null}

      <section className="highlight-row">
        <div className="highlight-card">
          <span>Visible shops</span>
          <strong>{filteredShops.length}</strong>
        </div>
        <div className="highlight-card">
          <span>Nearest picks</span>
          <strong>{nearestShops.length || "0"}</strong>
        </div>
        <div className="highlight-card">
          <span>Location</span>
          <strong>{userLocation ? "Live" : "Unavailable"}</strong>
        </div>
      </section>

      <div className="user-dashboard-grid">
        <section className="panel shop-results">
          <div className="panel-header">
            <h2>Shop results</h2>
            <span>{filters.activeOnly ? "Showing active offers" : "Showing all offers"}</span>
          </div>

          {nearestShops.length ? (
            <div className="nearest-strip">
              {nearestShops.map((shop) => (
                <button key={shop.id} type="button" className="nearest-chip" onClick={() => handleSelectShop(shop)}>
                  {shop.name}
                </button>
              ))}
            </div>
          ) : null}

          {isLoading ? (
            <div className="empty-state">Loading shops...</div>
          ) : filteredShops.length === 0 ? (
            <div className="empty-state">No shops matched your current filters.</div>
          ) : (
            <div className="shop-card-list">
              {filteredShops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  className={selectedShop?.id === shop.id ? "shop-card shop-card--selected" : "shop-card"}
                  onClick={() => handleSelectShop(shop)}
                >
                  <div className="shop-card__top">
                    <div>
                      <h3>{shop.name}</h3>
                      <p>{shop.category}</p>
                    </div>
                    <span className="shop-badge">{shop.activeOfferCount} active</span>
                  </div>
                  <p className="shop-card__address">{shop.address}</p>
                  <div className="shop-card__meta">
                    <span>{formatDistance(shop.distanceKm)}</span>
                    <span>{Number.isFinite(Number(shop.latitude)) ? "Mapped" : "No map pin"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="panel map-panel">
          <div className="panel-header">
            <h2>Live map</h2>
            <span>{userLocation ? "Blue marker is you" : "Enable location for distance sorting"}</span>
          </div>

          <div className="map-frame">
            <MapView
              shops={filteredShops}
              userLocation={userLocation}
              selectedShop={selectedShop}
              onSelectShop={handleSelectShop}
            />
          </div>
        </section>

        <section className="panel offer-panel">
          <div className="panel-header">
            <h2>{selectedShop ? selectedShop.name : "Shop offers"}</h2>
            <span>{selectedShop ? selectedShop.category : "Select a shop to inspect offers"}</span>
          </div>

          {selectedShop ? (
            <div className="offer-panel__summary">
              <p>{selectedShop.address}</p>
              <p>{formatDistance(selectedShop.distanceKm)}</p>
            </div>
          ) : null}

          {!selectedShop ? (
            <div className="empty-state">Pick a shop from the list or the map to view its offers.</div>
          ) : offersLoading ? (
            <div className="empty-state">Loading offers...</div>
          ) : offers.length === 0 ? (
            <div className="empty-state">No offers available for this shop right now.</div>
          ) : (
            <div className="offer-list">
              {offers.map((offer) => (
                <article key={offer.id} className="offer-item">
                  <div className="offer-item__top">
                    <div>
                      <h3>{offer.title}</h3>
                      <span>{offer.type}</span>
                    </div>
                    <span className={offer.active ? "offer-state offer-state--active" : "offer-state"}>
                      {offer.active ? "Active" : "Expired"}
                    </span>
                  </div>
                  <p>{offer.description}</p>
                  <div className="offer-dates">
                    <span>{formatOfferDate("Valid from", offer.startDate, "Legacy offer")}</span>
                    <span>{formatOfferDate("Until", offer.endDate, "No expiry date")}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
