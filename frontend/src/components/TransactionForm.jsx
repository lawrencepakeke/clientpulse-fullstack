import { useEffect, useState } from "react";

function TransactionForm({ onTransactionSaved, editingTransaction, onCancelEdit }) {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    clientId: "",
    serviceId: "",
    amount: "",
    source: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const clientsRes = await fetch("http://localhost:5000/api/clients");
      const servicesRes = await fetch("http://localhost:5000/api/services");

      setClients(await clientsRes.json());
      setServices(await servicesRes.json());
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        clientId: editingTransaction.clientId?._id || editingTransaction.clientId,
        serviceId: editingTransaction.serviceId?._id || editingTransaction.serviceId,
        amount: editingTransaction.amount,
        source: editingTransaction.source || ""
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingTransaction
      ? `http://localhost:5000/api/transactions/${editingTransaction._id}`
      : "http://localhost:5000/api/transactions";

    const method = editingTransaction ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        amount: Number(formData.amount)
      })
    });

    if (!response.ok) {
      alert("Failed to save transaction");
      return;
    }

    setFormData({
      clientId: "",
      serviceId: "",
      amount: "",
      source: ""
    });

    onTransactionSaved();
  };

  return (
    <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <h2>{editingTransaction ? "Edit Transaction" : "Create New Transaction"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
        <select name="clientId" value={formData.clientId} onChange={handleChange} required>
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <select name="serviceId" value={formData.serviceId} onChange={handleChange} required>
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
        />

        <button type="submit">
          {editingTransaction ? "Update Transaction" : "Create Transaction"}
        </button>

        {editingTransaction && (
          <button type="button" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;