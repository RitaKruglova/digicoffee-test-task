import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
import paymentsReducer from './slices/paymentsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    payments: paymentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;