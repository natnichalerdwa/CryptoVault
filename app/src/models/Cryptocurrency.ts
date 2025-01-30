
export interface Cryptocurrency {
    assetID: string;
    assetName: string;
    assetSymbol: string;
    price: number;
    currency: string;
    lastUpdated: string;
}

export const cryptoList: Cryptocurrency[] = [
    { assetID: '1', assetName: 'Bitcoin', assetSymbol: 'BTC', price: 100, currency: 'USD', lastUpdated: '2024-11-25' }
]