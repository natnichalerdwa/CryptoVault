// Tracker.tsx
import { useEffect, useState } from 'react';
import { getCryptocurrencies } from '../services/cryptocurrency-service';
import './Tracker.css';
import CryptoList from './CryptoList';
import AlertForm from './AlertForm';
import PriceAlertList from './PriceAlertList';  // Import the PriceAlertList
import { PriceAlert } from '../models/PriceAlerts';

interface Crypto {
  assetID: string;
  assetName: string;
  assetSymbol: string;
  price: number;
  currency: string;
  lastUpdated: string;
}

const Tracker: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [showAlertForm, setShowAlertForm] = useState(false); 
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [alertType, setAlertType] = useState<'Above' | 'Below'>('Above');  // Initialize alertType state

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await getCryptocurrencies();
        setCryptos(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
        setLoading(false);
      }
    };

    getCryptoData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.assetSymbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSetAlert = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setShowAlertForm(true);  // Show alert form when a crypto is selected
  };

  const closeAlertForm = () => {
    setShowAlertForm(false);
    setSelectedCrypto(null);
  };

  const handleSaveAlert = (targetPrice: number) => {
    if (selectedCrypto) {
      const newAlert: PriceAlert = {
        id: Date.now().toString(),  // Generate a unique ID (timestamp)
        assetID: selectedCrypto.assetID,
        assetName: selectedCrypto.assetName,
        assetSymbol: selectedCrypto.assetSymbol,
        price: selectedCrypto.price,
        targetPrice: targetPrice, 
        alertType: alertType,  // Use the current alertType state
      };

      setPriceAlerts((prevAlerts) => [...prevAlerts, newAlert]);
      setShowAlertForm(false);  // Close the alert form after saving
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tracker">
      <h1>Cryptocurrency Tracker</h1>
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <CryptoList 
        cryptocurrencies={filteredCryptos} 
        onSetAlert={handleSetAlert} 
      />
      {showAlertForm && selectedCrypto && (
        <AlertForm 
          crypto={selectedCrypto} 
          onClose={closeAlertForm} 
          alertType={alertType} 
          setAlertType={setAlertType} 
          onSave={handleSaveAlert}  // Passing the save function down to AlertForm
        />
      )}

      <h2>Price Alerts</h2>
      <PriceAlertList priceAlerts={priceAlerts} /> 
    </div>
  );
};

export default Tracker;