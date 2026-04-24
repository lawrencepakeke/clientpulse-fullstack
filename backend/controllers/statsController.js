import Transaction from "../models/transaction.js";

export const getTopClients = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: "$clientId",
          totalRevenue: { $sum: "$amount" },
          transactionCount: { $sum: 1 }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top clients stats" });
  }
};