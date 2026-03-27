import api from "./api";

export async function getOffersByShop(shopId, activeOnly = true) {
  const response = await api.get(`/offers/store/${shopId}`, {
    params: { activeOnly },
  });
  return response.data;
}

export async function createOffer(shopId, payload) {
  const response = await api.post(`/offers/shop/${shopId}`, payload);
  return response.data;
}

export async function updateOffer(offerId, payload) {
  const response = await api.put(`/offers/${offerId}`, payload);
  return response.data;
}

export async function deleteOffer(offerId) {
  const response = await api.delete(`/offers/${offerId}`);
  return response.data;
}
