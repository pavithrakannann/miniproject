import api from "./api";

export async function getAllShops() {
  const response = await api.get("/shops/all");
  return response.data;
}

export async function getOwnerShops(ownerId) {
  const response = await api.get(`/shops/owner/${ownerId}`);
  return response.data;
}

export async function createShop(ownerId, payload) {
  const response = await api.post(`/shops/owner/${ownerId}`, payload);
  return response.data;
}

export async function updateShop(shopId, payload) {
  const response = await api.put(`/shops/${shopId}`, payload);
  return response.data;
}
