import express from "express";
import {
  getAllServices,
  getTransactionsByService
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id/transactions", getTransactionsByService);

export default router;