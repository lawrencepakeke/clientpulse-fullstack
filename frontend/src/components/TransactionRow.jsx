function TransactionRow({ transaction }) {
  return (
    <tr>
      <td>{transaction.clientId?.name}</td>
      <td>{transaction.clientId?.industry}</td>
      <td>{transaction.serviceId?.name}</td>
      <td>{transaction.serviceId?.category}</td>
      <td>{transaction.amount} kr</td>
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>{transaction.source}</td>
    </tr>
  );
}

export default TransactionRow;