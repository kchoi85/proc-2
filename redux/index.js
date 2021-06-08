import { combineReducers, createStore, applyMiddleware } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import thunk from "redux-thunk";
import axios from "axios";
/*
https://www.imaginarycloud.com/blog/react-native-redux/
https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage/
*/
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const INITIAL_STATE = {
  state: {},
  menu: [],
};

// reducers
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DO_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_ITEM":
      //let menu =[...state.menu, action.payload];
      return {
        ...state,
        menu: [...state.menu, action.payload],
      };
    case "INC_ITEM":
      const index = state.menu.findIndex((i) => i._id == action.payload);
      const menu = [...state.menu];
      menu[index].quantity = menu[index].quantity + 1;
      return {
        ...state,
        menu: menu,
      };
    case "DEV_RESET":
      return {
        state: [],
        menu: [],
      };
    // case "FETCH_RESTAURANTS":
    //   return {
    //     ...state,
    //     restaurants: action.payload,
    //   };
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
export const store = createStore(persistedReducer, applyMiddleware(thunk)); //;
export const persistor = persistStore(store);

/*
Functions
*/
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
