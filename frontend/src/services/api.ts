import axios from "axios";
import { Event } from "../types/Event";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add interceptors for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      "🚀 API Request:",
      config.method?.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export const eventAPI = {
  getAllEvents: async (): Promise<Event[]> => {
    try {
      const response = await api.get("/events");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch events:", error);
      throw error;
    }
  },

  getEventById: async (id: number): Promise<Event> => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch event:", error);
      throw error;
    }
  },

  createEvent: async (
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<Event> => {
    try {
      console.log("📝 Creating event with data:", event);
      const response = await api.post("/events", event);
      console.log("🎉 Event created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create event:", error);
      throw error;
    }
  },

  updateEvent: async (
    id: number,
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<Event> => {
    try {
      const response = await api.put(`/events/${id}`, event);
      return response.data;
    } catch (error) {
      console.error("Failed to update event:", error);
      throw error;
    }
  },

  deleteEvent: async (id: number): Promise<void> => {
    try {
      await api.delete(`/events/${id}`);
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw error;
    }
  },

  getEventsByPriority: async (priority: number): Promise<Event[]> => {
    try {
      const response = await api.get(`/events/priority/${priority}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch events by priority:", error);
      throw error;
    }
  },
};
