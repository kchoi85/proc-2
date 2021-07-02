import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { EXPRESS_SERVER } from "@env";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export default function HomeScreen({ navigation }) {
  // {DEBUG} console.log(useSelector((state) => state.userReducer));
  //const [isLoading, setLoading] = useState(true);
  const [restaurantsArr, setRestaurants] = useState([]);

  var { favRes } = useSelector((state) => state.userReducer);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    fetch(`${EXPRESS_SERVER}/restaurants/getRestaurants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => Promise.resolve(response.json()))
      .then((json) => setRestaurants(json.restaurants))
      .catch((error) => console.error(error));
    //.finally(() => setLoading(false));
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

  function renderCategories() {
    const navigationRef = React.useRef(null);

    const categories = [
      {
        _id: 1,
        name: "Bubble Tea",
        img: `${EXPRESS_SERVER}/uploads/categories/Bubble_Tea.png`,
      },

      {
        _id: 2,
        name: "Chicken",
        img: `${EXPRESS_SERVER}/uploads/categories/Chicken.png`,
      },
      {
        _id: 3,
        name: "Sushi",
        img: `${EXPRESS_SERVER}/uploads/categories/Sushi.png`,
      },
      {
        _id: 4,
        name: "Traditional",
        img: `${EXPRESS_SERVER}/uploads/categories/Traditional.png`,
      },
      {
        _id: 5,
        name: "Korean",
        img: `${EXPRESS_SERVER}/uploads/categories/Korean.png`,
      },
      {
        _id: 6,
        name: "Chinese",
        img: `${EXPRESS_SERVER}/uploads/categories/Chinese.png`,
      },
      {
        _id: 7,
        name: "Mexican",
        img: `${EXPRESS_SERVER}/uploads/categories/Mexican.png`,
      },
      {
        _id: 8,
        name: "Alcohol",
        img: `${EXPRESS_SERVER}/uploads/categories/Alcohol.png`,
      },
      {
        _id: 9,
        name: "Vegetarian",
        img: `${EXPRESS_SERVER}/uploads/categories/Vegetarian.png`,
      },
      {
        _id: 10,
        name: "Sandwich & Subs",
        img: `${EXPRESS_SERVER}/uploads/categories/Sandwich_Subs.png`,
      },
    ];

    function renderCatItems(item) {
      return (
        <View>
          <TouchableOpacity
            style={{
              marginRight: 10,
              width: 93,
              height: 93,
            }}
            onPress={() => {
              // navigationRef.current?.navigate("SearchScreen");
              navigation.navigate("SearchScreen", { item });
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
            <Text
              style={{
                position: "absolute",
                left: "8%",
                bottom: "5%",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={{
          paddingLeft: SIZES.padding * 2,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
          }}
        >
          Main
        </Text>
        <Text
          style={{
            fontSize: 34,
            marginTop: -12,
            paddingBottom: 10,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>

        <FlatList
          data={categories}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderCatItems(item)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ paddingTop: 25, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Your Local Restaurants
          </Text>
        </View>
      </View>
    );
  }

  //=====================================================================================================================

  function renderRestaurantList() {
    return (
      <View>
        {/* Restaurants List */}
        <FlatList
          data={restaurantsArr}
          contentContainerStyle={{ paddingBottom: 60 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("RestaurantScreen", {
                    item,
                  })
                }
              >
                <View>
                  <Image
                    source={{ uri: `${EXPRESS_SERVER}/${item.resBanner}` }}
                    resizeMode="cover"
                    style={styles.cardImage}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        store.dispatch({
                          type: "DO_FAVORITE",
                          payload: item,
                        });
                      }}
                    >
                      <Image
                        source={icons.like}
                        resizeMode="contain"
                        style={{
                          width: 25,
                          height: 25,
                          tintColor: "white", //FF5353
                        }}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      height: 30,
                      width: SIZES.width * 0.3,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        // fontFamily: "RobotoBold",
                        fontSize: 15,
                      }}
                    >
                      {item.deliveryTime}
                    </Text>
                  </View>
                </View>

                {/* ============================================================= */}

                {/* Restaurant Info */}
                <View
                  style={{
                    paddingTop: 5,

                    paddingLeft: 10,
                    backgroundColor: "white",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      flexDirection: "row",

                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>

                  {/* Stars keywords moneysign */}
                  <View
                    style={{
                      paddingBottom: 10,
                      flexDirection: "row",
                    }}
                  >
                    {/* Categories */}
                    <Text
                      style={{
                        // fontFamily: "RobotoRegular",
                        fontSize: 14,

                        color: "black",
                      }}
                    >
                      {item.type}
                    </Text>
                    {/* Price
                  {[1, 2, 3].map((priceRating) => (
                    <Text
                      key={priceRating}
                      style={{
                        color: COLORS.grey,

                        // priceRating <= item.priceRating
                        //   ? COLORS.black
                        //   : COLORS.darkgray,
                      }}
                    >
                      $
                    </Text>
                  ))} */}

                    {/* Rating */}
                    {/* <Image
                    source={icons.star}
                    style={{
                      height: 15,
                      width: 15,
                      tintColor: COLORS.primary,
                      top: 1,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  /> */}
                    <View
                      style={{
                        position: "absolute",
                        right: "5%",
                        bottom: "100%",
                        width: 30,
                        height: 20,
                        backgroundColor: "#FF5353",
                        borderRadius: 5,
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            // fontFamily: "RobotoRegular",
                            fontSize: 14,
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {item.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {renderCategories()}
        {/* {renderMainCategories()} */}
        {renderRestaurantList()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  card: {
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "white",
    marginLeft: SIZES.padding * 2,
    marginRight: SIZES.padding * 2,
    marginBottom: 15, //between each cards
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
});
