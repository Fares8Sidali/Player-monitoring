import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});

announcementSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Announcement = mongoose.model("Announcement", announcementSchema);
