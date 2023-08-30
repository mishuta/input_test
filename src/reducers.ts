import { createReducer } from "@reduxjs/toolkit";
import { storeInput, clearInputs } from "./actions";

interface AppState {
  inputs: string[];
}

const localStorageInputs = localStorage.getItem("inputs");
const initialInputs = localStorageInputs ? JSON.parse(localStorageInputs) : [];

const initialState: AppState = {
  inputs: initialInputs,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(storeInput, (state, action) => {
      state.inputs.push(action.payload);
      localStorage.setItem("inputs", JSON.stringify(state.inputs));
    })
    .addCase(clearInputs, (state) => {
      state.inputs = [];
    });
});