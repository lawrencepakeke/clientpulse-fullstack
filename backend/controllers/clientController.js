import Client from "../models/Client.js";
import Transaction from "../models/transaction.js";

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

export const getTransactionsByClient = async (req, res) => {
  try {
    const transactions = await Transaction.find({ clientId: req.params.id })
      .populate("clientId", "name industry region segment")
      .populate("serviceId", "name category price");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch client transactions" });
  }
};