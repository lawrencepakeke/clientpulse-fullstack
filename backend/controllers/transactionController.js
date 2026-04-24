import Transaction from "../models/transaction.js";
import Client from "../models/Client.js";
import Service from "../models/service.js";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("clientId", "name industry region segment")
      .populate("serviceId", "name category price");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("getAllTransactions error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("clientId", "name industry region segment")
      .populate("serviceId", "name category price");

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { clientId, serviceId, amount, date, source } = req.body;

    if (!clientId || !serviceId || amount === undefined) {
      return res.status(400).json({
        error: "clientId, serviceId, and amount are required"
      });
    }

    const newTransaction = new Transaction({
      clientId,
      serviceId,
      amount,
      date,
      source
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { clientId, serviceId, amount, date, source } = req.body;

    if (!clientId || !serviceId || amount === undefined) {
      return res.status(400).json({
        error: "clientId, serviceId, and amount are required"
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { clientId, serviceId, amount, date, source },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};