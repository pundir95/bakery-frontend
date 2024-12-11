import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default store;
