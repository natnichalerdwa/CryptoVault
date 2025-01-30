// AlertForm.tsx
import React, { useState } from 'react';
import { Cryptocurrency } from '../models/Cryptocurrency';

interface AlertFormProps {
  crypto: Cryptocurrency;
  onClose: () => void;
  alertType: 'Above' | 'Below';
  setAlertType: React.Dispatch<React.SetStateAction<'Above' | 'Below'>>;  // Function to update alertType
  onSave: (targetPrice: number) => void;  // Function to save the alert
}

const AlertForm: React.FC<AlertFormProps> = ({ crypto, onClose, alertType, setAlertType, onSave }) => {
  const [targetPrice, setTargetPrice] = useState<number>(0);  // State for the target price input

  const handleAlertTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlertType(event.target.value as 'Above' | 'Below');
  };

  const handleTargetPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetPrice(parseFloat(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isNaN(targetPrice) && targetPrice > 0) {
      onSave(targetPrice);  // Pass the target price to the onSave function
    }
  };

  return (
    <div className="alert-form">
      <h2>Set Alert for {crypto.assetName} ({crypto.assetSymbol})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="alertType">Alert Type:</label>
          <select
            id="alertType"
            value={alertType}
            onChange={handleAlertTypeChange}
            style={{
              padding: '10px 20px',     
              borderRadius: '8px',     
              fontSize: '16px',       
              border: '1px solid #ccc', 
              backgroundColor: '#f9f9f9', 
              cursor: 'pointer',      
              width: '200px',         
            }}
          >
            <option value="Above">Above</option>
            <option value="Below">Below</option>
          </select>
        </div>

        <div>
          <label htmlFor="targetPrice">Target Price:</label>
          <input
            type="number"
            id="targetPrice"
            value={targetPrice}
            onChange={handleTargetPriceChange}
            placeholder="Enter target price"
            required
          />
        </div>

        <div>
          <button type="submit"
          style={{
            padding: '10px 20px',  
            marginRight: '10px',   
            backgroundColor: '#6a1b9a', 
            color: 'white',        
            borderRadius: '5px',    
            border: 'none',        
            cursor: 'pointer',      
          }}>Save Alert</button>
          <button type="button" onClick={onClose}
          style={{
            padding: '10px 20px', 
            backgroundColor: '#ddd',  
            color: '#6a1b9a',        
            borderRadius: '5px',     
            border: 'none',         
            cursor: 'pointer',     
          }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AlertForm;
