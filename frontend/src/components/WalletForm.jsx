import axios from 'axios';
import {useState} from 'react';
import {toast} from 'react-hot-toast';

export default function WalletForm({onAdded}){
    const [addr, setAddr]=useState('');
    const [coin, setCoin]=useState('BTC');

    async function submit(e){
        e.preventDefault();
        const res = await axios.post('http://localhost:6969/api/wallet/add', {
            address:addr, coin
        });
        localStorage.setItem('walletId', res.data._id);
        toast.success("Wallet saved");
        onAdded(res.data._id);
    }

    return(
        <form onSubmit={submit}>
        <select value={coin} onChange={(e) => setCoin(e.target.value)}>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
        </select>
        <input placeholder="address" value={addr} onChange={(e) => setAddr(e.target.value)} required />
        <button type="submit">Add</button>
        </form>
    );
}