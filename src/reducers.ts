import { createReducer } from "@reduxjs/toolkit";
import { storeInput } from "./actions";

interface AppState {
  inputs: string[];
}

const initialState: AppState = {
  inputs: [],
};

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(storeInput, (state, action) => {
    state.inputs.push(action.payload);
  });
});