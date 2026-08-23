"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const formClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const adminCaller = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminCaller.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("user_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!token) {
      const currentLocation = window.location.pathname;

      toast.error("Your session has expired. Please login again.");
      // window.location.href = `/login?redirect=${currentLocation}`;
    }

    return config;
  },

  (err) => {
    return Promise.reject(err);
  },
);
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

adminCaller.interceptors.response.use(
  (response) => response,
  async (error) => {
    const currentLocation = window.location.pathname;
    const originalRequest = error.config;

    // Handle network/CORS case safely
    if (!error.response) {
      console.error("Network/CORS error:", error);
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // const refreshToken = sessionStorage.getItem("refresh_token");

      // if (!refreshToken) {
      //   sessionStorage.clear();
      //   window.location.href = `/login?redirect=${currentLocation}`;
      //   return Promise.reject(error);
      // }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return adminCaller(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await axiosClient.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refreshToken`,
          {
            refreshToken,
            accessToken: sessionStorage.getItem("user_token"),
          },
        );

        const newToken = res.data?.data?.accessToken;

        sessionStorage.setItem("user_token", newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return adminCaller(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        sessionStorage.clear();
        // window.location.href = `/login?redirect=${currentLocation}`;

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 500) {
      toast.error("Something went wrong");
    }

    return Promise.reject(error);
  },
);

formClient.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("user_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!token) {
      const currentLocation = window.location.pathname;

      toast.error("Your session has expired. Please login again.");
      // window.location.href = `/login?redirect=${currentLocation}`;
    }

    return config;
  },

  (err) => {
    return Promise.reject(err);
  },
);
