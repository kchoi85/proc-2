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
  Dimensions,
} from "react-native";

// import { isIphoneX } from "react-native-iphone-x-helper";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

export default function ItemScreen({ route, navigation }) {
  const { _id, item, details, price } = route.params;
  const [text, onChangeText] = React.useState("");
  const [itemCount, setItemCount] = React.useState(1);

  const { menu } = useSelector((state) => state.userReducer);
  const { sTotal } = useSelector((state) => state.userReducer); // total of shopping cart
  console.log(useSelector((state) => state.userReducer));

  function addToCart(itemId, itemName, price, count) {
    const newItem = {
      _id: itemId,
      item: itemName,
      quantity: count,
      pricePerOne: price,
    };
    store.dispatch({ type: "ADD_ITEM", payload: newItem });
    navigation.goBack();
  }

  function editOrder(action, itemId, itemName, price) {
    //let cartItems = menu.slice(); // duplicate existing menu (cart) array
    let cartItem = menu.filter((existingItem) => existingItem._id === itemId);

    if (action == "+") {
      if (cartItem.length > 0) {
        store.dispatch({ type: "INC_ITEM", payload: _id });
      } else {
        //item dne in cart
        const newItem = {
          _id: itemId,
          item: itemName,
          quantity: 1,
          price: price,
        };

        store.dispatch({ type: "ADD_ITEM", payload: newItem });
      }
    }

    if (action == "-") {
      store.dispatch({ type: "DEV_RESET" });
    }
  }

  function getItemQty(itemId) {
    let cartItem = menu.filter((existingItem) => existingItem._id === itemId);
    if (cartItem.length > 0) {
      return cartItem[0].quantity;
    } else {
      return 0;
    }
  }

  // function getSubTotal() {
  //   let subTotal = 0;
  //   menu.forEach((item) => (subTotal = item.quantity * item.price));
  //   return subTotal;
  // }

  // function getCartCount() {
  //   let itemCount = orderItems.reduce((a, b) => a + (b.quantity || 0), 0);
  //   return itemCount;
  // }

  function renderHeader() {
    return (
      <ImageBackground
        source={images.pizza_restaurant}
        style={{
          width: "100%",
          height: Dimensions.get("window").height * 0.2,
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
            bottom: "3%",
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
            onPress={() => {
              if (itemCount > 1) {
                setItemCount(itemCount - 1);
              }
            }}
          >
            {/* editOrder("-", _id, item, price) */}
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
            <Text style={{ fontSize: 30 }}>{itemCount}</Text>
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
            onPress={() => setItemCount(itemCount + 1)}
          >
            {/* editOrder("+", _id, item, price) */}
            <Text style={{ fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function addItemToCart() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: SIZES.padding * 2,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.black,
            borderRadius: 30,
            height: 50,
            width: "80%",
          }}
          onPress={() => addToCart(_id, item, price, itemCount)}
        >
          <Text style={{ fontWeight: "normal", fontSize: 20, color: "white" }}>
            Add {itemCount} to cart ?? ${(price * itemCount).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView showsHorizontalScrollIndicator={false}>
      {renderHeader()}
      {infoSection()}
      {orderSection()}
      {addItemToCart()}
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
