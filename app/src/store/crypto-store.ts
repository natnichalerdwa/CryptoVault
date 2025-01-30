import { createSlice } from '@reduxjs/toolkit';
import { Cryptocurrency } from '../models/Cryptocurrency';
import { AppState } from '.';

export type CryptoState = Array<Cryptocurrency>;

const initialState: CryptoState = [];

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: initialState,
    reducers: {
        loadCrypto: (state: CryptoState, action) => {
            return [...action.payload];
        }
    },
});

export const { loadCrypto } = cryptoSlice.actions;