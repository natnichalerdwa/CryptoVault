import cryptoprice from "../models/cryptoprices.js";
import dotenv from "dotenv";

dotenv.config();

const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const API_KEY = 'c46a5ff2-480a-4339-b38c-376d1b6eb512';


export const get = async () => {
    try {
        const response = await fetch(
            API_URL, {
                method: "GET",
                headers: {
                    "X-CMC_PRO_API_KEY": API_KEY,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch crypto prices");
        }
        
        const data = await response.json();

        // schema mapping
        const formattedData = data.data.map((crypto) => ({
            assetID: crypto.id,
            assetName: crypto.name,
            assetSymbol: crypto.symbol,
            price: crypto.quote.USD.price,
            currency: "USD",
            lastUpdated: crypto.last_updated
        }));

        // aave each formatted entry to the database
        const savedPrices = [];
        for (const crypto of formattedData) {
            const savedCrypto = await cryptoprice.create(crypto); // Save using Mongoose
            savedPrices.push(savedCrypto);
        }

        // return saved prices to the calling function
        return savedPrices;

    } catch(error) {
        throw new Error(error.message);
    }
};

// function to get crypto by ID from the database
export const getById = async (assetID) => {
    try {
        // Find the specific asset ID
        const cryptoAsset = await cryptoprice.findOne({ assetID })

        if (!cryptoAsset) {
            throw new Error(`No crypto asset found with ID ${assetID}`);
        }

        return cryptoAsset;
    } catch (error) {
        throw new Error(error.message);
    }
};

// get all crypto prices from the database
export const getCryptoPrice = async () => {
    try {
        const cryptoPrices = await cryptoprice.find();
        return cryptoPrices;
    } catch (error) {
        throw new Error(error.message);
    }
};