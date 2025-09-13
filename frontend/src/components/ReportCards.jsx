export default function ReportCards({ report = { gains: [], netGain: 0, tax: 0 } }) {
    const tds = report.gains
      .filter(g => g.type === 'sell')
      .reduce((s, g) => s + g.amount * 0.01, 0);
    return (
      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <div>Net Gain: ₹{report.netGain.toFixed(2)}</div>
        <div>Tax 30 %: ₹{report.tax.toFixed(2)}</div>
        <div>TDS 1 %: ₹{tds.toFixed(2)}</div>
      </div>
    );
  }