import { Cryptocurrency } from "../models/Cryptocurrency";

const base = 'http://localhost:3002/cryptoprices';

// Fetch all cryptocurrencies
export const getCryptocurrencies = async (): Promise<Cryptocurrency[]> => {
    const response = await fetch(base, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrencies");
    }

    const data = await response.json();

    const cryptocurrencies = data.map((crypto: any) => ({
        assetID: crypto.assetID,
        assetName: crypto.assetName,
        assetSymbol: crypto.assetSymbol,
        price: crypto.price,
        currency: crypto.currency,
        lastUpdated: crypto.lastUpdated,
    }));

    return cryptocurrencies;
};

// Fetch cryptocurrency details by asset ID (new function)
export const getCryptoPriceById = async (assetID: string) => {
    const response = await fetch(`http://localhost:3002/cryptoprices/${assetID}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch details for asset ID: ${assetID}`);
    }

    const data = await response.json();

    // Return formatted data (you can adjust the format if needed)
    return {
        assetID: data.assetID,
        assetName: data.assetName,
        assetSymbol: data.assetSymbol,
        price: data.price,
        currency: data.currency,
    };
};

// Fetch asset details by assetID
export const getCryptoDetails = async (assetID: string) => {
  const response = await fetch(`${base}/${assetID}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cryptocurrency details");
  }

  const data = await response.json();

  // Assuming the data structure is similar to your previous response
  const assetDetails = {
    assetID: data.assetID,
    assetName: data.assetName,
    assetSymbol: data.assetSymbol,
    price: data.price,
    currency: "USD",
    lastUpdated: data.lastUpdated,
  };

  return assetDetails;
};