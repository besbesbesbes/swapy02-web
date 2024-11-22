import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getUserInfoApi = async (token) =>
  await axios.get(`${baseUrl}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserInfoApi = async (token, input) =>
  await axios.patch(`${baseUrl}/user/update-user`, input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changePasswordApi = async (token, input) =>
  await axios.post(`${baseUrl}/user/change-password`, input, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeProfilePicApi = async (token, body) =>
  await axios.post(`${baseUrl}/user/change-profilepic`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
