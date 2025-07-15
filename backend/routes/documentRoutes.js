import express from "express";
import { verifyFirebaseToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Documents fetched successfully", user: req.user });
});

router.post("/", verifyFirebaseToken, (req, res) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Document created",
    document: {
      title,
      content,
      owner: req.user.uid,
    },
  });
});

export default router;
