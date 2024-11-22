import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAssetsApi = async (token, user) =>
  await axios.get(`${baseUrl}/search/all?i=` + user.userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const hdlReadyApi = async (token, el) =>
  await axios.post(
    `${baseUrl}/asset/assetReady/` + el.assetId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const createAssetApi = async (token, body) =>
  await axios.post(`${baseUrl}/asset/`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
