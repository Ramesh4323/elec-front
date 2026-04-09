import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// ✅ FORCE backend URL if ENV not set
const baseURL =
  process.env.REACT_APP_API_URL?.trim() ||
  "https://elec-back.onrender.com";

// ✅ Set axios base URL
axios.defaults.baseURL = baseURL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUser(res.data.data);
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const res = await axios.post("/api/users/login", { email, password });

    const { token, data } = res.data;

    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(data);

    return data;
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });

    const { token, data } = res.data;

    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};