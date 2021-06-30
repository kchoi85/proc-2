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
  Platform,
  ImageBackground,
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";
import axios from "axios";

export default function OrderScreen({ navigation }) {
  const [ordersArray, setOrdersArray] = React.useState([]);

  let { user } = useSelector((state) => state.userReducer);
  let uid = user?._id;

  React.useEffect(() => {
    async function onOrders({ userId }) {
      try {
        const response = await axios.post(
          "http://192.168.2.12:4000/orders/getAllOrders",
          {
            userId,
          }
        );
        // console.log(response.data);
        setOrdersArray(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    }
    onOrders({ userId: uid });
  }, []);

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
            <Text style={{ fontWeight: "bold" }}>Order</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderOrders() {
    const renderEachOrder = ({ item }) => {
      if (item?.orderStatus === "Driver-pending") {
        return (
          <TouchableOpacity>
            <View style={styles.order}>
              <Text>Restaurant Name: {item?.restaurantInfo.name}</Text>
              <Text>Total Items: {item?.itemTotal}</Text>
              <Text>Timestamp: {item?.timestamp}</Text>
              <Text style={{ color: "red" }}>
                Order Status: {item?.orderStatus}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity>
            <View style={styles.order}>
              <Text>Restaurant Name: {item?.restaurantId}</Text>
              <Text>Total Items: {item?.itemTotal}</Text>
              <Text>Timestamp: {item?.timestamp}</Text>
              <Text>Order Status: {item?.orderStatus}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    };

    return (
      <View>
        <FlatList
          data={ordersArray}
          keyExtractor={({ _id }) => _id}
          renderItem={renderEachOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderOrders()}
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
    paddingLeft: SIZES.padding * 3,
    paddingRight: SIZES.padding * 3,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "white",
  },
  button: {
    paddingBottom: 3,
    paddingTop: 20,
    borderBottomWidth: 1,
  },
  order: {
    borderTopWidth: 0.5,
    borderTopColor: "grey",
    paddingBottom: 20,
  },
});
