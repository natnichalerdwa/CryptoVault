import PriceAlert from '../models/pricealert.js';
import { getCryptoPrice } from './cryptoprices-service.js'; // Reusing crypto price functionality

// Create a new price alert
const createPriceAlert = async (alertData) => {
    const alert = new PriceAlert({
        crypto: alertData.crypto,
        targetPrice: alertData.targetPrice,
        alertType: alertData.alertType,
    });

    await alert.save();
    return alert;
};

// Check and trigger active price alerts
const checkPriceAlerts = async () => {
    const alerts = await PriceAlert.find({ active: true });
    for (const alert of alerts) {
        const currentPrice = await getCryptoPrice(alert.crypto);

        if (
            (alert.alertType === 'above' && currentPrice >= alert.targetPrice) ||
            (alert.alertType === 'below' && currentPrice <= alert.targetPrice)
        ) {
            // Trigger alert (mock notification)
            console.log(
                `Price Alert Triggered: ${alert.crypto} is ${alert.alertType} ${alert.targetPrice}`
            );
            alert.active = false;
            alert.triggeredAt = new Date();
            await alert.save();
        }
    }
};

// Delete an alert
const deletePriceAlert = async (alertId) => {
    await PriceAlert.findByIdAndDelete(alertId);
};

export default {
    createPriceAlert,
    checkPriceAlerts,
    deletePriceAlert,
};
