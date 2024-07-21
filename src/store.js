import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './features/trans_Slice';

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
    },
});
