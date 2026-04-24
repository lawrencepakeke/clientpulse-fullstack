function StatsPanel({ transactions }) {
  const totalTransactions = transactions.length;

  const totalRevenue = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const averageValue =
    totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  const sourceCounts = transactions.reduce((counts, transaction) => {
    const source = transaction.source || "Unknown";
    counts[source] = (counts[source] || 0) + 1;
    return counts;
  }, {});

  const topSource =
    Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
      <div>
        <strong>Total Revenue</strong>
        <p>{totalRevenue.toLocaleString()} kr</p>
      </div>

      <div>
        <strong>Transactions</strong>
        <p>{totalTransactions}</p>
      </div>

      <div>
        <strong>Average Value</strong>
        <p>{Math.round(averageValue).toLocaleString()} kr</p>
      </div>

      <div>
        <strong>Top Source</strong>
        <p>{topSource}</p>
      </div>
    </div>
  );
}

export default StatsPanel;