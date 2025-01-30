import * as cryptoPricesService from '../services/cryptoprices-service.js';
import { setSuccess, setError } from './response-handler.js';

export const get = async (request, response) => {
    try {
    const cryptoPrices = await cryptoPricesService.get();
    setSuccess(cryptoPrices, response);
    } catch(error) {
        setError(error, response);
    }
}

// controller method for getting asset by ID
export const getById = async (req, res) => {
    try {
        const assetID = req.params.assetID;
        const cryptoAsset = await cryptoPricesService.getById(assetID);
        
        if (!cryptoAsset) {
            return res.status(404).json({ message: `No crypto asset found with ID ${assetID}` });
        }
        
        res.json(cryptoAsset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};