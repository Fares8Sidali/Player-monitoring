import express from "express";
import { Announcement } from "../models/AnnouncementModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 }).populate("createdBy", "fullname");
  res.json(announcements);
});


router.post("/", async (req, res) => {
  const { title, message, userId } = req.body;

  const newAnn = new Announcement({ title, message, createdBy: userId });
  await newAnn.save();
  res.status(201).json(newAnn);
});


router.put("/seen/:userId", async (req, res) => {
  const userId = req.params.userId;
  await Announcement.updateMany(
    { seenBy: { $ne: userId } },
    { $push: { seenBy: userId } }
  );
  res.status(200).json({ message: "Marked as seen" });
});

export default router;
