import Service from "../models/service.js";
import Transaction from "../models/transaction.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

export const getTransactionsByService = async (req, res) => {
  try {
    const transactions = await Transaction.find({ serviceId: req.params.id })
      .populate("clientId", "name industry region segment")
      .populate("serviceId", "name category price");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service transactions" });
  }
};