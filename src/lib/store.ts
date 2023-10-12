import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { CanvasData, GetCanvasDataActionType, WrappedCanvasData, API_URL_PROJECT } from "../constants";
import { getCanvasData } from "./api";
import { put, takeEvery } from "redux-saga/effects";
import { GET_CANVAS_DATA, CANVAS_DATA_FETCHED_SUCCEEDED, CANVAS_DATA_FETCHED_FAILED } from "../actions/actionTypes";

type GetCanvasDataAction = { type: typeof GET_CANVAS_DATA; id?: string; isLoading: boolean };
type ActionTypes = "CANVAS_DATA_FETCHED_SUCCEEDED" | "CANVAS_DATA_FETCHED_FAILED" | "GET_CANVAS_DATA";

function* getCanvasDataAction(action: GetCanvasDataAction): GetCanvasDataActionType {
  let id;
  if (action.id) {
    id = action.id;
  } else {
    const randomProjectID = yield getCanvasData();
    id = randomProjectID || null;
  }

  let success = true;

  try {
    const projectResponse = yield fetch(`${API_URL_PROJECT}${id}`);
    if (!projectResponse.ok) {
      success = false;
    } else {
      const projectData = yield projectResponse.json();
      yield put({ type: CANVAS_DATA_FETCHED_SUCCEEDED, payload: projectData });
    }
  } catch (error) {
    success = false;
  }

  if (!success) {
    yield put({ type: CANVAS_DATA_FETCHED_FAILED, error: new Error("🔥 could Not get Data") });
  }
}

function* rootSaga() {
  yield takeEvery(GET_CANVAS_DATA, getCanvasDataAction);
}

const initialState: WrappedCanvasData = {
  data: {},
  error: null,
};

const reducer = (
  state: WrappedCanvasData = initialState,
  action: {
    error: Error;
    isLoading: boolean;
    payload: CanvasData;
    type: ActionTypes;
  }
) => {
  switch (action.type) {
    case CANVAS_DATA_FETCHED_SUCCEEDED:
      return { ...state, data: action.payload, isLoading: false, error: null };
    case CANVAS_DATA_FETCHED_FAILED:
      return { ...state, isLoading: false, error: action.error };
    case GET_CANVAS_DATA:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectCanvasData = (state: CanvasData | {}) => state;
