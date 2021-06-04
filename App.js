import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store } from "./redux/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/index";

import Tabs from "./navigation/tabs";
import HomeScreen from "./screens/HomeScreen";
import { RestaurantScreen, ItemScreen, LoginScreen } from "./screens";

const Stack = createStackNavigator();
//    <CredentialsContext.Provider value={CredentialsContext}>

// export const CredentialsContext = React.createContext(null);
export default function App() {
  //const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:4000/restaurants/getRestaurants', {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setData(json.restaurants))
  //     .catch((error) => console.error(error))
  //   //.finally(() => setLoading(false));
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginScreen />
      </PersistGate>
    </Provider>

    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{ headerShown: false }}
    //     initialRouteName={"HomeScreen"}
    //   >
    //     <Stack.Screen name="HomeScreen" component={Tabs} />
    //     <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
    //     <Stack.Screen name="ItemScreen" component={ItemScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    flex: 0.5,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
