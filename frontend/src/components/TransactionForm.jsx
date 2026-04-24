import { useEffect, useState } from "react";

function TransactionForm({ onTransactionCreated }) {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    clientId: "",
    serviceId: "",
    amount: "",
    source: ""
  });

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [clientsResponse, servicesResponse] = await Promise.all([
          fetch("http://localhost:5000/api/clients"),
          fetch("http://localhost:5000/api/services")
        ]);

        if (!clientsResponse.ok || !servicesResponse.ok) {
          throw new Error("Failed to load form options");
        }

        const clientsData = await clientsResponse.json();
        const servicesData = await servicesResponse.json();

        setClients(clientsData);
        setServices(servicesData);
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      setFormData({
        clientId: "",
        serviceId: "",
        amount: "",
        source: ""
      });

      onTransactionCreated();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return <p>Loading form options...</p>;
  }

  return (
    <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <h2>Create New Transaction</h2>

      {submitError && <p style={{ color: "red" }}>{submitError}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
        >
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
          placeholder="Source (e.g. Website, Referral)"
          value={formData.source}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;