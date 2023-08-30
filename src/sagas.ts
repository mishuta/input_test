import { put, takeLatest } from "redux-saga/effects";
import { storeInput } from "./actions";

function* storeInputSaga(action: ReturnType<typeof storeInput>) {
  yield put(storeInput(action.payload));
}

export function* watchInput() {
  // yield takeLatest(storeInput.type, storeInputSaga);
}