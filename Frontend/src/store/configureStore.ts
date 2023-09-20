/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware, StoreEnhancer } from "@reduxjs/toolkit";
import { createInjectorsEnhancer } from "redux-injectors";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

import { createReducer } from "./reducer";
import baseRedux from "./slice/base.slice";

export const history = createBrowserHistory();

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer({ root: baseRedux }),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });

  return store;
}
