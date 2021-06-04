import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

/*
https://www.imaginarycloud.com/blog/react-native-redux/
https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage/
*/
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// reducers
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "DO_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "FETCH_RESTAURANTS":
      return {
        ...state,
        restaurants: action.payload,
      };
    case "ON_ERROR":
      return {
        ...state,
        appError: action.payload,
      };
    default:
      return state;
  }
};

// root router (for multiple reducers)
const persistConfig = {
  key: "persistedReducer",
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  userReducer,
});

// store
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer); //applyMiddleware(thunk));
export const persistor = persistStore(store);

export const onUserLogin = async ({ email, password }) => {
  const response = await axios.post(
    "http://192.168.2.12:4000/drivers/loginDriver",
    {
      email,
      password,
    }
  );
  store.dispatch({ type: "DO_LOGIN", payload: response.data });
  //console.log(store.getState().userReducer.user.token);
};

export const onFetchRestaurants = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = {
        data: [
          { name: "Res_1", price: "500" },
          { name: "Res_2", price: "400" },
          { name: "Res_3", price: "600" },
        ],
      };
      store.dispatch({ type: "FETCH_RESTAURANTS", payload: response.data }); // response.data
    } catch (error) {
      store.dispatch({ type: "ON_ERROR", payload: error }); // response.dat
    }
  };
};