import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const login = async (email, password) => {
  const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  return data.token;
};

export const getScreens = async (token) => {
  const { data } = await axios.get("http://localhost:5000/api/screens/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const getTickets = async (token) => {
  const { data } = await axios.get("http://localhost:5000/api/tickets", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
