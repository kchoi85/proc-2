import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Arimated,
  StatusBar,
  FlatList,
  Platform,
  ImageBackground,
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";
import { store } from "../redux";
import { EXPRESS_SERVER, GOOGLE_MAPS_API } from "@env";

export default function CheckOutScreen({ route, navigation }) {
  const [items, setItems] = React.useState([]);
  const [messageText, setMessageText] = React.useState("Message to Restaurant");
  const [tips, setTips] = React.useState(0);
  let { user } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    setItems(route.params.menu);
    let tipcalc = sTotal * 0.1;
    tipcalc = Math.round(tipcalc * 100) / 100;
    setTips(tipcalc);
  });

  //   console.log(SIZES.padding * 7); -> 70

  let sTotal = 0;
  let tax = 0;
  let TAX_CAN_ON = 1.13;
  let total = 0;

  for (var i = 0; i < items.length; i++) {
    sTotal += items[i].pricePerOne * items[i].quantity;
  }

  tax = sTotal * (TAX_CAN_ON - 1);
  total = sTotal + tax + tips + 1;

  sTotal = Math.round(sTotal * 100) / 100;
  tax = Math.round(tax * 100) / 100;
  total = Math.round(total * 100) / 100;

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          borderBottomWidth: 0.5,
          borderBottomColor: "grey",
          backgroundColor: "white",
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 200,
              borderTopEndRadius: 200,
              height: 40,
              width: 40,
              backgroundColor: "white",
              marginLeft: SIZES.padding * 2,
              marginTop: SIZES.padding,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              height: 40,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 200,
              backgroundColor: "white",
              marginHorizontal: SIZES.padding * 7,
              marginTop: SIZES.padding,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Check Out</Text>
          </View>
        </View>
      </View>
    );
  }

  function calculateTotal() {
    const renderPrices = (item, index) => {
      return (
        <View style={{ paddingBottom: 20 }}>
          <Text>
            {item.quantity} x Item: {item.item}
          </Text>
          <Text>Price: {item.pricePerOne * item.quantity}</Text>
        </View>
      );
    };
    return (
      <View style={styles.body}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => renderPrices(item, index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: 30,
          }}
        />
        <Text>Subtotal: ${sTotal}</Text>
        <Text>Tax: ${tax}</Text>
        <Text>Tips: ${tips}</Text>
        <Text>Delivery Fee: $1</Text>
        <Text>Total: ${total}</Text>
      </View>
    );
  }

  // submitting order logic
  function submitOrder() {
    let data = {
      method: "POST",
      // credentials: 'same-origin',
      // mode: 'same-origin',
      body: JSON.stringify({
        restaurantId: route.params.restaurantId,
        customerId: user._id,
        items: items,
        message: messageText,
        subtotal: sTotal,
        taxes: tax,
        tips: tips,
        total: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    store.dispatch({ type: "SUBMIT_ORDER" });
    navigation.goBack();
    return fetch(`${EXPRESS_SERVER}/orders/submitOrder`, data)
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJson))
      .catch((error) => console.log(error));
  }

  function renderMessageBox() {
    return (
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={setMessageText}
          placeholder={messageText}
        />
      </View>
    );
  }

  function orderButton() {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.black,
          border: 30,
          height: 50,
          width: 200,
        }}
        onPress={() => submitOrder()}
      >
        <Text style={{ fontWeight: "normal", fontSize: 20, color: "white" }}>
          Complete Order
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {calculateTotal()}

      {renderMessageBox()}

      {orderButton()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  body: {
    marginLeft: SIZES.padding * 3,
    marginRight: SIZES.padding * 3,
  },
  input: {
    height: 30,
    borderWidth: 0.5,
  },
});
