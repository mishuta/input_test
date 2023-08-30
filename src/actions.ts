import { createAction } from "@reduxjs/toolkit";

export const storeInput = createAction<string>("STORE_INPUT");
export const clearInputs = createAction("CLEAR_INPUTS");