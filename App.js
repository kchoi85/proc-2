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
import {
  RestaurantScreen,
  ItemScreen,
  CheckOutScreen,
  AccountScreen,
  LoginScreen,
  WalletScreen,
  RegisterScreen,
  AccSettingsScreen,
  LocationScreen,
  OrderScreen,
  HelpScreen,
  SearchScreen,
} from "./screens";

const Stack = createStackNavigator();
//    <CredentialsContext.Provider value={CredentialsContext}>

// export const CredentialsContext = React.createContext(null);
export default function App() {
  //const [isLoading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <LoginScreen /> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"HomeScreen"}
          >
            <Stack.Screen name="HomeScreen" component={Tabs} />
            <Stack.Screen
              name="RestaurantScreen"
              component={RestaurantScreen}
            />
            <Stack.Screen name="ItemScreen" component={ItemScreen} />
            <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />

            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="AccSettingsScreen"
              component={AccSettingsScreen}
            />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />

            <Stack.Screen name="WalletScreen" component={WalletScreen} />

            <Stack.Screen name="SearchScreen" component={SearchScreen} />

            <Stack.Screen name="LocationScreen" component={LocationScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="HelpScreen" component={HelpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
