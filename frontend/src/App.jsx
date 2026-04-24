import StatsPanel from "./components/StatsPanel";
import { useEffect, useMemo, useState } from "react";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/transactions");

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.clientId?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>ClientPulse</h1>
      <p>Client transaction analytics dashboard</p>

      <TransactionForm 
        onTransactionSaved={() => {
          fetchTransactions();
          setEditingTransaction(null);
        }}
        editingTransaction={editingTransaction}
        onCancelEdit={() => setEditingTransaction(null)}
      />

      <StatsPanel transactions={transactions} />
      
      <input
        type="text"
        placeholder="Search by client name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.6rem",
          width: "300px",
          marginTop: "1rem",
          marginBottom: "1rem"
        }}
      />

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <p>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <TransactionTable 
            transactions={filteredTransactions} 
            onDelete={fetchTransactions} 
            onEdit={setEditingTransaction}
          />
        </>
      )}
    </div>
  );
}

export default App;