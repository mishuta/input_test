import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { appReducer } from "./reducers";
import { watchInput } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchInput);

export type RootState = ReturnType<typeof store.getState>;