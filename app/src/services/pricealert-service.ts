import { PriceAlert } from '../models/PriceAlerts';

const base = 'http://localhost:3002/pricealerts';

// Fetch all price alerts
export const getPriceAlerts = async (): Promise<PriceAlert[]> => {
    const response = await fetch(base, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch price alerts");
    }

    const data = await response.json();

    const priceAlerts = data.map((alert: any) => ({
        id: alert.id,
        crypto: alert.crypto,
        targetPrice: alert.targetPrice,
        alertType: alert.alertType,
    }));

    return priceAlerts;
};

// Create a new price alert
export const createPriceAlert = async (alert: PriceAlert) => {
    const response = await fetch(base, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(alert),
    });

    if (!response.ok) {
        throw new Error("Failed to create price alert");
    }
};

// Delete a price alert by ID
export const deletePriceAlert = async (id: string) => {
    const response = await fetch(`${base}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete price alert");
    }
};