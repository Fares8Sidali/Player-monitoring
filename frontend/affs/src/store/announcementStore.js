import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAnnouncementStore = create((set) => ({
  announcements: [],
  unseenCount: 0,

  fetchAnnouncements: async (userId) => {
    const res = await axiosInstance.get("/announcements");
    set({ announcements: res.data });

    const unseen = res.data.filter((a) => !a.seenBy.includes(userId));
    set({ unseenCount: unseen.length });
  },

  sendAnnouncement: async (data) => {
    await axiosInstance.post("/announcements", data);
  },

  markAsSeen: async (userId) => {
    await axiosInstance.put(`/announcements/seen/${userId}`);
    set({ unseenCount: 0 });
  }
}));
