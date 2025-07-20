import express from "express";
import { verifyFirebaseToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - owner
 *         - createdAt
 *       properties:
 *         title:
 *           type: string
 *           example: "Untitled Page"
 *         content:
 *           type: string
 *           example: "<p>Hello world</p>"
 *         owner:
 *           type: string
 *           example: "wbq9Yp7ku0UgeIPORbxE7N7Uu5A2"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-17T06:20:58.000Z"
 * 
 *     User:
 *       type: object
 *       required:
 *         - uid
 *         - email
 *         - name
 *         - role
 *         - createdAt
 *       properties:
 *         uid:
 *           type: string
 *           example: "Lq8rnS5zIcZuF3RKFXm1qzVJu5E3"
 *         email:
 *           type: string
 *           format: email
 *           example: "aarthi.kelam@gmail.com"
 *         name:
 *           type: string
 *           example: "Aarthi Kelam"
 *         role:
 *           type: string
 *           example: "user"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-16T08:00:33.000Z"
 */

/**
 * @openapi
 * /api/documents:
 *   get:
 *     summary: Get all documents for the authenticated user
 *     tags: [Documents]
 *     security:
 *       - firebaseAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 */
router.get("/", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Documents fetched successfully", user: req.user });
});

/**
 * @openapi
 * /api/documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     security:
 *       - firebaseAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Untitled Page"
 *               content:
 *                 type: string
 *                 example: "<p>New document content</p>"
 *     responses:
 *       201:
 *         description: Document created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 document:
 *                   $ref: '#/components/schemas/Document'
 */
router.post("/", verifyFirebaseToken, (req, res) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Document created",
    document: {
      title,
      content,
      owner: req.user.uid,
      createdAt: new Date().toISOString(),
    },
  });
});

export default router;
