import WalletForm from '../components/WalletForm';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  function handleAdded(id) { console.log('saved', id); }
  return (
    <>
      <Toaster position="top-right" />
      <h1>Nirmashard</h1>
      <WalletForm onAdded={handleAdded} />
    </>
  );
}