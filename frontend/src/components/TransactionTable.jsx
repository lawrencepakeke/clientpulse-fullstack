import TransactionRow from "./TransactionRow";

function TransactionTable({ transactions }) {
  return (
    <table
      border="1"
      cellPadding="10"
      cellSpacing="0"
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
    >
      <thead>
        <tr>
          <th>Client</th>
          <th>Industry</th>
          <th>Service</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;