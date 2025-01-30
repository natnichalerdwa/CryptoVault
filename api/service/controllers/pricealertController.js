import priceAlertService from '../services/pricealert-service.js';

// Create a new price alert
export const createPriceAlert = async (req, res) => {
    try {
        const { crypto, targetPrice, alertType } = req.body;
        console.log(req.body);
        //const userId = req.user.id; // Assuming authentication middleware adds `user` to `req`

        const alert = await priceAlertService.createPriceAlert({ crypto, targetPrice, alertType });
        res.status(201).json({ success: true, alert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all alerts for the authenticated user
export const getPriceAlerts = async (req, res) => {
    try {
        const userId = req.user.id;
        const alerts = await priceAlertService.getPriceAlerts(userId); // Adjusted to use a service
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an alert by ID
export const deletePriceAlert = async (req, res) => {
    try {
        const { alertId } = req.params;
        await priceAlertService.deletePriceAlert(alertId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
