import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import todoReducer from "./todo-reducer";

const loggerMiddleware = store => next => action => {
  console.info(`[REDUX] Will dispatch: ${action.type}`);
  const returnValue = next(action);
  console.info(`[REDUX] New state:`);
  console.info(store.getState());
  return returnValue;
};

export default createStore(todoReducer, applyMiddleware(thunk));
