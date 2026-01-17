import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
// import {
//   createOrUpdateConfig,
//   rollbackConfig,
//   getAllActiveConfigs,
// } from "../services/configService.js";
import { createOrUpdateConfig,rollbackConfig,getAllActiveConfigs } from "../services/configServices.js";
const router = express.Router();

// 🔐 Protected admin routes
router.post("/configs", adminAuth, async (req, res) => {
    console.log("Admin token validated successfully.",req.body);
  try {
    const result = await createOrUpdateConfig(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/configs/rollback", adminAuth, async (req, res) => {
  try {
    const result = await rollbackConfig(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔓 Public read route
router.get("/configs", async (req, res) => {
  try {
    const { env } = req.query;
    const configs = await getAllActiveConfigs(env);
    res.json(configs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
