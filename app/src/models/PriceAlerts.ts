
export interface PriceAlert {
    id: string;
    assetID: string;
    assetName: string;
    assetSymbol: string;
    price: number;
    targetPrice: number;
    alertType: string;
}

export const priceAlertList: PriceAlert[] = [
    { id: '1', assetID: '1', assetName: 'Bitcoin', assetSymbol: 'BTC', price: 1000, targetPrice: 100, alertType: 'above' },
    { id: '2', assetID: '2', assetName: 'Ethereum', assetSymbol: 'ETH', price: 3000, targetPrice: 200, alertType: 'below' }
]