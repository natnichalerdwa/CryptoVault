import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceAlert } from '../models/PriceAlerts';
import { AppState } from '.';

export type PriceAlertsState = Array<PriceAlert>;

const initialState: PriceAlertsState = [];

export const priceAlertsSlice = createSlice({
  name: 'priceAlerts',
  initialState: initialState,
  reducers: {
    loadPriceAlerts: (state: PriceAlertsState, action: PayloadAction<PriceAlertsState>) => {
      return [...action.payload];
    },
    deletePriceAlert: (state: PriceAlertsState, action: PayloadAction<string>) => {
      return state.filter((alert) => alert.id !== action.payload); // Filters based on the alert id
    }
  },
});

export const { loadPriceAlerts, deletePriceAlert } = priceAlertsSlice.actions;

export const selectPriceAlerts = (state: AppState) => state.priceAlerts;

export const findPriceAlerts = (id: string | undefined): ((state: AppState) => PriceAlert | undefined) => {
    return (state: AppState) => state.priceAlerts.find((alert) => alert.id === id && id !== undefined);
}
