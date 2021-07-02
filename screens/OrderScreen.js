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
  TextInput,
  ScrollView,
  LogBox,
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";
import axios from "axios";
import { EXPRESS_SERVER } from "@env";

export default function OrderScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState(
    "Search orders by date or restaurant name"
  );
  const [ordersArray, setOrdersArray] = React.useState([]);

  let { user } = useSelector((state) => state.userReducer);
  let uid = user?._id;

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    async function onOrders({ userId }) {
      try {
        const response = await axios.post(
          `${EXPRESS_SERVER}/orders/getAllOrders`,
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
          paddingTop: 15,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#FF5353", fontSize: 16, fontWeight: "bold" }}>
            DELIVERY
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 3,
              paddingBottom: 10,
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("LocationScreen")}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              18 Yonge St
            </Text>
            <Text style={{ fontSize: 10, paddingLeft: 5 }}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderSearchBar() {
    function searchFilter(text) {
      text = text.trim();
      let regex = new RegExp(text, "i");
      setOrdersArray(
        ordersArray.filter((item) => item.restaurantInfo.name.match(regex))
      );
      if (ordersArray.length == 0 || searchText.length === 0) {
        async function onOrders({ userId }) {
          try {
            const response = await axios.post(
              `${EXPRESS_SERVER}/orders/getAllOrders`,
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
      }
    }
    return (
      <View style={styles.body}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 0.2,
            borderBottomColor: "#B6B6B6",
          }}
        >
          <View style={styles.input}>
            <Image
              source={icons.search}
              resizeMode="cover"
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={{ paddingLeft: 10, width: "100%", height: "100%" }}
              onChangeText={(text) => searchFilter(text)}
              placeholder={searchText}
            />
          </View>
          {/* space between Top categories and searchBar */}
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 18, paddingLeft: 5 }}>
              Ongoing / Past Orders
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderOrders() {
    const renderEachOrder = ({ item }) => {
      let time = item?.timestamp;
      time = time.split("-");

      const months = [
        "Trailer",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      let month = Number(time[1]); //6
      month = months[month];
      let day = time[2].split("T")[0];

      if (item?.orderStatus === "Driver-pending") {
        return (
          <TouchableOpacity style={styles.card}>
            <View style={styles.order}>
              <Image
                source={{
                  uri: `${EXPRESS_SERVER}/${item.restaurantInfo.resBanner}`,
                }}
                rexizeMode="cover"
                style={styles.cardImage}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>
                  {item?.restaurantInfo.name}
                </Text>
                <Text style={{ color: "#7E7E7E" }}>
                  {item?.itemTotal} Items · ${item?.total}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#7E7E7E" }}>
                    {month} {day} ·
                  </Text>
                  <Text style={{ color: "#FF5353" }}> {item?.orderStatus}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.card}>
            <View style={styles.order}>
              <Image
                source={{
                  uri: `${EXPRESS_SERVER}/${item.restaurantInfo.resBanner}`,
                }}
                rexizeMode="cover"
                style={styles.cardImage}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>
                  {item?.restaurantInfo.name}
                </Text>
                <Text style={{ color: "#7E7E7E" }}>
                  {item?.itemTotal} Items · ${item?.total}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#7E7E7E" }}>
                    {month} {day} ·
                  </Text>
                  <Text style={{ color: "#7E7E7E" }}> {item?.orderStatus}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    };

    return (
      <View style={styles.body}>
        <FlatList
          style={{ paddingTop: 5 }}
          data={ordersArray}
          keyExtractor={({ _id }) => _id}
          renderItem={renderEachOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      <ScrollView>{renderOrders()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  body: {
    paddingTop: 5,
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    height: 55,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 2,
  },

  order: {
    flexDirection: "row",
  },
  card: {
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "white",
    marginBottom: 5, //between each cards
  },
  cardImage: {
    width: 90,
    height: 90,
  },
});
