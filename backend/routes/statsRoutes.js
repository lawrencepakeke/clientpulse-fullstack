import express from "express";
import { getTopClients } from "../controllers/statsController.js";

const router = express.Router();

router.get("/top-clients", getTopClients);

export default router;