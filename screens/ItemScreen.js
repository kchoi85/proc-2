import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Arimated,
  StatusBar,
  FlatList,
  ImageBackground,
  TextInput,
} from "react-native";

// import { isIphoneX } from "react-native-iphone-x-helper";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";

export default function ItemScreen({ route, navigation }) {
  const { _id, item, details, price } = route.params;
  const [text, onChangeText] = React.useState("");

  const [orderItems, setOrderItem] = React.useState([]);

  function editOrder(action, itemId, price) {
    //console.log(_id, item, details, price);
    let orderList = orderItems.slice(); // duplicate orderItem array into orderList
    // itemC -> item in Cart
    let itemC = orderList.filter((a) => a.itemId == itemId);
    // Array [
    //     Object {
    //       "item": "3 Pc Tenders Combo (1 Reg Side, 1 Biscuit and a Drink)",
    //       "itemId": "60ae966b0d9d1e10a8cd0e64",
    //       "price": 2.33,
    //       "quantity": 1,
    //     },
    //   ]

    if (action == "+") {
      if (itemC.length > 0) {
        let newQty = itemC[0].quantity + 1;
        itemC[0].quantity = newQty;
        //item[0].total = item[0].quantity * price
      } else {
        const newItem = {
          item: route.params.item,
          quantity: 1,
          price: price,
        };
        orderList.push(newItem);
      }
      setOrderItem(orderList);
      //console.log(orderItems);
    } else {
      if (itemC.length > 0) {
        if (itemC[0].quantity > 0) {
          let newQty = itemC[0].quantity - 1;
          itemC[0].quantity = newQty;
        }
      }
      setOrderItem(orderList);
      //console.log(orderItems);
    }
  }

  function getOrderQty(itemId) {
    let orderItem = orderItems.filter((a) => (a.itemId = itemId));
    console.log(orderItem);
    if (orderItem.length > 0) {
      return orderItem[0].quantity;
    } else {
      return 0;
    }
  }

  function getCartCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.quantity || 0), 0);
    return itemCount;
  }

  function renderHeader() {
    //console.log(route.params.item);
    return (
      <ImageBackground
        source={images.pizza_restaurant}
        style={{
          width: "100%",
          height: 250,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: SIZES.padding * 2,
            paddingLeft: SIZES.padding * 2,
            paddingTop: SIZES.padding * 1,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 200,
              borderTopEndRadius: 200,
              height: 40,
              width: 40,
              backgroundColor: "white",
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                paddingTop: StatusBar.currentHeight,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  function infoSection() {
    return (
      <View
        style={{
          paddingLeft: SIZES.padding * 2,
          paddingTop: SIZES.padding,
          paddingRight: SIZES.padding * 2,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item}</Text>

        <Text style={{ marginTop: 5, color: "grey" }}>{details}</Text>
      </View>
    );
  }

  function orderSection() {
    return (
      <View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#dddddd",
            height: 40,
          }}
        >
          <View>
            <Text
              style={{
                paddingLeft: SIZES.padding * 2,
                marginTop: 10,
                marginBottom: 10,
                color: "black",
              }}
            >
              Message to the Restaurant
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Special instructions... (Extra Sauce, no garlic, etc)"
          />
        </View>
        <View style={{ backgroundColor: "white", height: 80 }}>
          <View
            style={{
              backgroundColor: "#dddddd",
              height: 1,
              width: "90%",
              marginTop: 10,
              marginLeft: SIZES.padding * 2,
              marginRight: SIZES.padding * 2,
            }}
          ></View>
        </View>

        {/* quantity */}
        <View
          style={{
            position: "absolute",
            bottom: -20,
            width: SIZES.width,
            height: 60,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              ...styles.shadow,
            }}
            onPress={() => editOrder("-", _id, price)}
          >
            <Text style={{ fontSize: 40 }}>-</Text>
          </TouchableOpacity>

          <View
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ fontSize: 30 }}>{getOrderQty(_id)}</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              ...styles.shadow,
            }}
            onPress={() => editOrder("+", _id, price)}
          >
            <Text style={{ fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{getCartCount()}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView>
      {renderHeader()}
      {infoSection()}
      {orderSection()}
    </SafeAreaView>
  );
}

//paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  menus: {
    flexDirection: "row",
    marginLeft: 15,
    marginBottom: 20,
  },
  input: {
    paddingLeft: SIZES.padding * 2,
    backgroundColor: "white",
    height: 70,
    color: "grey",
  },
  shadow: {
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 3,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});
