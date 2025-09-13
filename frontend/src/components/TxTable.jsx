export default function TxTable({ txns = [] }) {
    return (
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Coin</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {txns.map(t => (
            <tr key={t.txid}>
              <td>
                {t.date ? new Date(t.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }) : 'Unknown'}
              </td>
              <td>{t.btc ? 'BTC' : 'ETH'}</td>
              <td>{(t.btc || t.eth || 0).toFixed(8)}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }