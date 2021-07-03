import { combineReducers, createStore, applyMiddleware } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import thunk from "redux-thunk";
import axios from "axios";
/*
https://www.imaginarycloud.com/blog/react-native-redux/
https://blog.jscrambler.com/how-to-use-redux-persist-in-react-native-with-asyncstorage/
*/
//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistStore, persistReducer } from "redux-persist";

const INITIAL_STATE = {
  userLoggedIn: false,
  openedFirstTime: true,
  user: {},
  menu: [],
  favRes: [],
};

// reducers
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DO_INITIAL_APP_REGISTER":
      return {
        ...state,
        openedFirstTime: false,
      };
    case "DO_LOGIN":
      return {
        ...state,
        user: action.payload,
        userLoggedIn: true,
      };
    case "DO_LOGOUT":
      return {
        userLoggedIn: false,
        user: {},
        menu: [],
        favRes: [],
      };
    case "DO_REGISTER":
      return {
        ...state,
        user: action.payload,
        userLoggedIn: true,
      };
    case "DO_FAVORITE":
      const favRes = [...state.favRes];

      if (favRes.indexOf(action.payload) == -1) {
        return {
          ...state,
          favRes: [...state.favRes, action.payload],
        };
      } else {
        return {
          ...state,
        };
      }
    case "DO_UNFAVORITE":
      const unFavRes = [...state.favRes];
      if (unFavRes.indexOf(action.payload) !== -1) {
        return {
          ...state,
          favRes: state.favRes.filter((item) => item !== action.payload),
        };
      }
      return {
        ...state,
      };
    case "ADD_ITEM":
      return {
        ...state,
        menu: [...state.menu, action.payload],
        //sTotal: state.sTotal + action.payload.price,
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
        userLoggedIn: false,
        openedFirstTime: true,
        user: {},
        menu: [],
        favRes: [],
      };
    case "SUBMIT_ORDER":
      return {
        ...state,
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
