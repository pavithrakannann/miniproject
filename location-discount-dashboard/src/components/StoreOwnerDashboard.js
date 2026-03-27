import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOffer, deleteOffer, getOffersByShop, updateOffer } from "../services/offerService";
import { createShop, getOwnerShops } from "../services/shopService";
import { clearStoredUser, getStoredUser } from "../utils/auth";
import "../styles/StoreOwnerDashboard.css";

const emptyShopForm = {
  name: "",
  category: "",
  address: "",
  latitude: "",
  longitude: "",
};

const emptyOfferForm = {
  title: "",
  description: "",
  type: "PERCENTAGE",
  startDate: "",
  endDate: "",
};

function StoreOwnerDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [offers, setOffers] = useState([]);
  const [shopForm, setShopForm] = useState(emptyShopForm);
  const [offerForm, setOfferForm] = useState(emptyOfferForm);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingShop, setIsSavingShop] = useState(false);
  const [isSavingOffer, setIsSavingOffer] = useState(false);

  const loadShops = useCallback(async (preferredShopId = null) => {
    try {
      setIsLoading(true);
      const response = await getOwnerShops(user.id);
      setShops(response);

      if (!response.length) {
        setSelectedShop(null);
      } else if (preferredShopId) {
        setSelectedShop(response.find((shop) => shop.id === preferredShopId) || response[0]);
      } else {
        setSelectedShop((current) => current ? response.find((shop) => shop.id === current.id) || response[0] : response[0]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your shops.");
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccess("");
    }, 60000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [success]);

  useEffect(() => {
    async function loadOffers() {
      if (!selectedShop) {
        setOffers([]);
        return;
      }

      try {
        const response = await getOffersByShop(selectedShop.id, false);
        setOffers(response);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load offers.");
      }
    }

    loadOffers();
  }, [selectedShop]);

  const handleShopFieldChange = (event) => {
    setShopForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOfferFieldChange = (event) => {
    setOfferForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateShop = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSavingShop(true);

    try {
      const newShop = await createShop(user.id, {
        ...shopForm,
        latitude: shopForm.latitude ? Number(shopForm.latitude) : null,
        longitude: shopForm.longitude ? Number(shopForm.longitude) : null,
      });

      setShopForm(emptyShopForm);
      setSelectedShop(newShop);
      setSuccess("Shop added successfully.");
      await loadShops(newShop.id);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to add this shop.");
    } finally {
      setIsSavingShop(false);
    }
  };

  const handleEditOffer = (offer) => {
    setEditingOfferId(offer.id);
    setOfferForm({
      title: offer.title,
      description: offer.description,
      type: offer.type,
      startDate: offer.startDate,
      endDate: offer.endDate,
    });
  };

  const resetOfferEditor = () => {
    setEditingOfferId(null);
    setOfferForm(emptyOfferForm);
  };

  const handleSubmitOffer = async (event) => {
    event.preventDefault();
    if (!selectedShop) {
      setError("Select a shop before adding an offer.");
      return;
    }

    setError("");
    setSuccess("");
    setIsSavingOffer(true);

    try {
      if (editingOfferId) {
        await updateOffer(editingOfferId, offerForm);
        setSuccess("Offer updated successfully.");
      } else {
        await createOffer(selectedShop.id, offerForm);
        setSuccess("Offer added successfully.");
      }

      resetOfferEditor();
      const refreshedOffers = await getOffersByShop(selectedShop.id, false);
      setOffers(refreshedOffers);
      await loadShops(selectedShop.id);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save this offer.");
    } finally {
      setIsSavingOffer(false);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteOffer(offerId);
      const refreshedOffers = await getOffersByShop(selectedShop.id, false);
      setOffers(refreshedOffers);
      setSuccess("Offer deleted successfully.");
      await loadShops(selectedShop.id);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete this offer.");
    }
  };

  const handleAutofillLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setShopForm((current) => ({
          ...current,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
      },
      () => {
        setError("Unable to access your location.");
      }
    );
  };

  const handleLogout = () => {
    clearStoredUser();
    navigate("/login");
  };

  return (
    <div className="owner-page">
      <header className="owner-hero">
        <div>
          <span className="dashboard-kicker">Offer Hunt Owner Hub</span>
          <h1>Manage shops and offers from one control center.</h1>
          <p>Track active promotions, add new locations, and keep every offer current.</p>
        </div>

        <div className="dashboard-hero__actions">
          <div className="user-pill">
            <strong>{user?.name}</strong>
            <span>Store owner dashboard</span>
          </div>
          <button type="button" className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {error ? <div className="status-banner status-banner--error">{error}</div> : null}
      {success ? <div className="status-banner status-banner--success">{success}</div> : null}

      <div className="owner-grid">
        <section className="panel owner-panel">
          <div className="panel-header">
            <h2>Add a new shop</h2>
            <span>Only shop name and category are required. Address and coordinates are optional.</span>
          </div>

          <form className="owner-form" onSubmit={handleCreateShop}>
            <label>
              Shop name
              <input name="name" value={shopForm.name} onChange={handleShopFieldChange} placeholder="Offer Hunt Cafe" required />
            </label>

            <label>
              Category
              <input name="category" value={shopForm.category} onChange={handleShopFieldChange} placeholder="Restaurant" required />
            </label>

            <label>
              Address
              <textarea name="address" value={shopForm.address} onChange={handleShopFieldChange} placeholder="Optional address" />
            </label>

            <div className="owner-form__row">
              <label>
                Latitude
                <input name="latitude" value={shopForm.latitude} onChange={handleShopFieldChange} placeholder="Optional latitude" />
              </label>
              <label>
                Longitude
                <input name="longitude" value={shopForm.longitude} onChange={handleShopFieldChange} placeholder="Optional longitude" />
              </label>
            </div>

            <div className="owner-form__actions">
              <button type="button" className="ghost-button" onClick={handleAutofillLocation}>
                Use current location
              </button>
              <button type="submit" className="primary-button" disabled={isSavingShop}>
                {isSavingShop ? "Saving..." : "Add shop"}
              </button>
            </div>
          </form>
        </section>

        <section className="panel owner-panel">
          <div className="panel-header">
            <h2>Your shops</h2>
            <span>{shops.length} locations managed</span>
          </div>

          {isLoading ? (
            <div className="empty-state">Loading your shops...</div>
          ) : shops.length === 0 ? (
            <div className="empty-state">Add your first shop to start publishing offers.</div>
          ) : (
            <div className="shop-card-list">
              {shops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  className={selectedShop?.id === shop.id ? "shop-card shop-card--selected" : "shop-card"}
                  onClick={() => setSelectedShop(shop)}
                >
                  <div className="shop-card__top">
                    <div>
                      <h3>{shop.name}</h3>
                      <p>{shop.category}</p>
                    </div>
                    <span className="shop-badge">{shop.activeOfferCount} active</span>
                  </div>
                  <p className="shop-card__address">{shop.address || "No address added yet"}</p>
                  <div className="shop-card__meta">
                    <span>{shop.latitude && shop.longitude ? "Coordinates ready" : "Coordinates missing"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="panel owner-panel">
          <div className="panel-header">
            <h2>{editingOfferId ? "Edit offer" : "Offer manager"}</h2>
            <span>{selectedShop ? `Managing ${selectedShop.name}` : "Select a shop to manage offers"}</span>
          </div>

          <form className="owner-form" onSubmit={handleSubmitOffer}>
            <label>
              Title
              <input name="title" value={offerForm.title} onChange={handleOfferFieldChange} placeholder="Flat 20% off" required />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={offerForm.description}
                onChange={handleOfferFieldChange}
                placeholder="Available on dine-in orders above Rs 799"
                required
              />
            </label>

            <div className="owner-form__row">
              <label>
                Offer type
                <select name="type" value={offerForm.type} onChange={handleOfferFieldChange}>
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="PRODUCT">Product</option>
                  <option value="COMBO">Combo</option>
                  <option value="SERVICE">Service</option>
                </select>
              </label>
              <label>
                Start date
                <input name="startDate" type="date" value={offerForm.startDate} onChange={handleOfferFieldChange} required />
              </label>
              <label>
                End date
                <input name="endDate" type="date" value={offerForm.endDate} onChange={handleOfferFieldChange} required />
              </label>
            </div>

            <div className="owner-form__actions">
              <button type="button" className="ghost-button" onClick={resetOfferEditor}>
                Clear
              </button>
              <button type="submit" className="primary-button" disabled={isSavingOffer || !selectedShop}>
                {isSavingOffer ? "Saving..." : editingOfferId ? "Update offer" : "Add offer"}
              </button>
            </div>
          </form>

          <div className="offer-list owner-offer-list">
            {offers.length === 0 ? (
              <div className="empty-state">No offers added for this shop yet.</div>
            ) : (
              offers.map((offer) => (
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
                    <span>{offer.startDate}</span>
                    <span>{offer.endDate}</span>
                  </div>
                  <div className="owner-offer-actions">
                    <button type="button" className="ghost-button" onClick={() => handleEditOffer(offer)}>
                      Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDeleteOffer(offer.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StoreOwnerDashboard;
