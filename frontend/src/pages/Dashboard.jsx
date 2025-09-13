import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import WalletForm from '../components/WalletForm';
import TxTable from '../components/TxTable';
import ReportCards from '../components/ReportCards';
import MonthlyChart from '../components/MonthlyChart';

export default function Dashboard() {
  const [walletId, setWalletId] = useState(localStorage.getItem('walletId'));
  const [txns, setTxns] = useState([]);
  const [report, setReport] = useState({ gains: [], netGain: 0, tax: 0 });


  useEffect(() => {
    if (!walletId) return;
    axios.get(`http://localhost:6969/api/wallet/${walletId}/txs`)
      .then(res => setTxns(res.data))
      .catch(err => console.error(err));
  }, [walletId]);

  function handleAdded(id) {
    setWalletId(id);
    localStorage.setItem('walletId', id);
    toast.success('Wallet saved');
  }

  async function calcReport() {
    if (!walletId) return;
    const res = await axios.get(`http://localhost:6969/api/wallet/${walletId}/report`);
    setReport(res.data);
    toast.success('Report calculated');
  }

  return (
    <>
      <Toaster position="top-right" />
      <h1>Nirmashard – BTC/ETH Tax (India)</h1>
      <WalletForm onAdded={handleAdded} />
      {walletId && (
        <>
          <button onClick={calcReport} style={{ margin: '1rem 0' }}>Calculate gains</button>
          <ReportCards report={report} />
          <MonthlyChart gains={report.gains} />
          <TxTable txns={txns} />
        </>
      )}
    </>
  );
}