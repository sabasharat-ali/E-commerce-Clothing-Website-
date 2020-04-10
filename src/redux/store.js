import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootRoducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootRoducer, applyMiddleware(...middlewares));

export default store;
