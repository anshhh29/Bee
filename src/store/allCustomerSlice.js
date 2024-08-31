import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allCustomerSlice = createSlice({
  name: "customer", // Adjusted the name from "cart" to "customer"
  initialState,
  reducers: {
    addAllCustomer(state, action) {
      state.push(action.payload);
    },
    removeCustomer(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    removeAllCustomers(state) {
      return (state = []);
    },
  },
});

export const { addAllCustomer, removeCustomer, removeAllCustomers } = allCustomerSlice.actions;
export default allCustomerSlice.reducer;
