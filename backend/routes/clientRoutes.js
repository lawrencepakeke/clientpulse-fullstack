import express from "express";
import {
  getAllClients,
  getTransactionsByClient
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id/transactions", getTransactionsByClient);

export default router;