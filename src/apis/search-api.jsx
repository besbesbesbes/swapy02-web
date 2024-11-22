import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getPreFill = async () => await axios.get(`${baseUrl}/search?p=0`);

export const getAllAssetsApi = async (page) =>
  await axios.get(`${baseUrl}/search?p=` + page);

export const getAllAssetsLoadMoreApi = async (page) =>
  await axios.get(`${baseUrl}/search?p=` + (page + 1));

export const getHighlightAssetsApi = async () =>
  await axios.get(`${baseUrl}/search/highlight`);

export const getAllAssetsCatApi = async (page, searchParams) =>
  await axios.get(`${baseUrl}/search?c=` + searchParams + "&p=" + page);
export const getAllAssetsValApi = async (page, searchParams) =>
  await axios.get(`${baseUrl}/search?v=` + searchParams + "&p=" + page);
export const getAssetByIdApi = async (currentAsset) =>
  await axios.get(`${baseUrl}/search/all?a=` + currentAsset);
export const deleteAasetApi = async (token, currentAsset) =>
  await axios.delete(`${baseUrl}/asset/` + currentAsset, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
