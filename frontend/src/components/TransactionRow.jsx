function TransactionRow({ transaction, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${transaction._id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      onDelete(); // refresh table
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <tr>
      <td>{transaction.clientId?.name}</td>
      <td>{transaction.clientId?.industry}</td>
      <td>{transaction.serviceId?.name}</td>
      <td>{transaction.serviceId?.category}</td>
      <td>{transaction.amount} kr</td>
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>{transaction.source}</td>
      <td>
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionRow;