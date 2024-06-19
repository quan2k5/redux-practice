import { combineReducers,createStore } from "redux";
import reducerBooks from "./reducers/reducerBooks";
const rootReducer=combineReducers({reducerBooks})
const store=createStore(rootReducer);
export default store;
