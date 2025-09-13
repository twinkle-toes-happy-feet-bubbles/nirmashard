import React from 'react';

export default function TxTable({ txns = [] }) {
  return (
    <table className="table">
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
            <td>{new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
            <td>{t.btc ? 'BTC' : 'ETH'}</td>
            <td>{(t.btc || t.eth || 0).toFixed(8)}</td>
            <td>{t.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}