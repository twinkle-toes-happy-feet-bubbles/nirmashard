import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import WalletForm from '../components/WalletForm';
import TxTable from '../components/TxTable';
import ReportCards from '../components/ReportCards';
import MonthlyChart from '../components/MonthlyChart';
import '../pages/Dashboard.css';

export default function Dashboard() {
  const [walletId, setWalletId] = useState(localStorage.getItem('walletId'));
  const [txns, setTxns] = useState([]);
  const [report, setReport] = useState({ gains: [], netGain: 0, tax: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!walletId) return;
    
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:6969/api/wallet/${walletId}/txs`);
        setTxns(res.data);
      } catch (err) {
        console.error('Failed to load transactions:', err);
        toast.error('Failed to load transactions');
      }
    };

    const fetchReport = async () => {
      try {
        const res = await axios.get(`http://localhost:6969/api/wallet/${walletId}/report`);
        setReport(res.data);
      } catch (err) {
        console.error('Failed to calculate report:', err);
        toast.error('Failed to calculate report');
      }
    };

    fetchTransactions();
    fetchReport();
  }, [walletId]);

  const handleCalculateGains = async () => {
    if (!walletId) return;
    
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:6969/api/wallet/${walletId}/report`);
      setReport(res.data);
      toast.success('Gains calculated successfully');
    } catch (err) {
      console.error('Failed to calculate gains:', err);
      toast.error('Failed to calculate gains');
    } finally {
      setLoading(false);
    }
  };

  function handleAdded(id) {
    setWalletId(id);
    localStorage.setItem('walletId', id);
    toast.success('Wallet saved');
  }

  return (
    <div className="dashboard">
      <Toaster position="top-right" />
      <h1>Nirmashard - BTC/ETH Tax (India)</h1>
      <WalletForm onAdded={handleAdded} />
      
      {walletId && (
        <>
          <button 
            onClick={handleCalculateGains} 
            disabled={loading}
            style={{ margin: '1rem 0' }}
          >
            {loading ? 'Calculating...' : 'Calculate gains'}
          </button>
          
          <div className="report-cards">
            <div className="report-card">
              <h3>Net Gain</h3>
              <div className="value">₹{report.netGain.toFixed(2)}</div>
            </div>
            <div className="report-card">
              <h3>Tax 30%</h3>
              <div className="value">₹{report.tax.toFixed(2)}</div>
            </div>
            <div className="report-card">
              <h3>TDS 1%</h3>
              <div className="value">₹{(report.gains.reduce((s, g) => s + g.amount * 0.01, 0)).toFixed(2)}</div>
            </div>
          </div>
          
          <div className="chart">
            <MonthlyChart gains={report.gains} />
          </div>
          
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
        </>
      )}
    </div>
  );
}