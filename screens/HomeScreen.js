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
  FlatList,
  ScrollView,
} from "react-native";
import { store } from "../redux";
import { useSelector } from "react-redux";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export default function HomeScreen({ navigation }) {
  console.log(useSelector((state) => state.userReducer));
  // const [loaded] = useFonts({
  //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  //   RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
  //   RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  // });

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            // width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("LocationScreen");
          }}
        >
          <View
            style={{
              width: "80%",
              height: 40,
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ fontSize: 20 }}>18 Yonge St.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => store.dispatch({ type: "DEV_RESET" })}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }

  //=====================================================================================================================

  // function renderMainCategories() {
  //   const renderItem = ({ item }) => {
  //     return (
  //       <TouchableOpacity
  //         style={{
  //           padding: SIZES.padding,
  //           paddingBottom: SIZES.padding * 2,
  //           borderRadius: SIZES.radius,
  //           alignItems: "center",
  //           justifyContent: "center",
  //           marginRight: SIZES.padding,
  //           ...styles.shadow,
  //         }}
  //         //onPress={() => onSelectCategory(item)}
  //       >
  //         <View
  //           style={{
  //             width: 50,
  //             height: 50,
  //             borderRadius: 25,
  //             alignItems: "center",
  //             justifyContent: "center",
  //             backgroundColor: COLORS.lightGray,
  //           }}
  //         >
  //           <Image
  //             source={icons.basket}
  //             resizeMode="contain"
  //             style={{
  //               width: 30,
  //               height: 30,
  //             }}
  //           />
  //         </View>

  //         <Text
  //           style={{
  //             marginTop: SIZES.padding,
  //             color:
  //               selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
  //             ...FONTS.body5,
  //           }}
  //         >
  //           {item.name}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   };

  //   return (
  //     <View style={{ padding: SIZES.padding * 2 }}>
  //       <Text
  //         style={{
  //           fontFamily: "RobotoBlack",
  //           fontSize: 36,
  //           paddingBottom: 0,
  //         }}
  //       >
  //         Main
  //       </Text>
  //       <Text
  //         style={{
  //           fontFamily: "RobotoBlack",
  //           fontSize: 36,
  //           marginTop: -10,
  //         }}
  //       >
  //         Categories
  //       </Text>

  //       <FlatList
  //         data={data}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={({ _id }, index) => _id}
  //         renderItem={({ item }) => {
  //           <TouchableOpacity
  //             style={{
  //               padding: SIZES.padding,
  //               paddingBottom: SIZES.padding * 2,
  //               backgroundColor: COLORS.primary,
  //               borderRadius: SIZES.radius,
  //               alignItems: "center",
  //               justifyContent: "center",
  //               marginRight: SIZES.padding,
  //               ...styles.shadow,
  //             }}
  //             //onPress={() => onSelectCategory(item)}
  //           >
  //             <View
  //               style={{
  //                 width: 50,
  //                 height: 50,
  //                 borderRadius: 25,
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 backgroundColor: COLORS.lightGray,
  //               }}
  //             >
  //               <Image
  //                 source={icons.basket}
  //                 resizeMode="contain"
  //                 style={{
  //                   width: 30,
  //                   height: 30,
  //                 }}
  //               />
  //             </View>
  //             <Text
  //               style={{
  //                 marginTop: SIZES.padding,
  //                 color: COLORS.black,
  //                 ...FONTS.body5,
  //               }}
  //             >
  //               {item.name}
  //             </Text>
  //           </TouchableOpacity>;
  //         }}
  //         contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
  //       />
  //     </View>
  //   );
  // }

  //=====================================================================================================================

  //const [isLoading, setLoading] = useState(true);
  const [restaurantsArr, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://192.168.2.12:4000/restaurants/getRestaurants", {
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
  // console.log(restaurantsArr);

  function renderRestaurantList() {
    return (
      <View
        style={{
          paddingLeft: SIZES.padding * 2,
          paddingRight: SIZES.padding * 2,
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
        {/* ====================================================================== */}

        {/* Restaurants List */}
        <FlatList
          data={restaurantsArr}
          keyExtractor={({ _id }) => _id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
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
                  source={images.pizza_restaurant}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 180,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  borderRadius={SIZES.radius}
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
                        payload: item._id,
                      });
                    }}
                  >
                    <Image
                      source={icons.like}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
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
                    backgroundColor: COLORS.lightGray4,

                    // borderTopRightRadius: SIZES.radius,
                    // borderBottomRightRadius: SIZES.radius,

                    alignItems: "center",
                    justifyContent: "center",
                    ...styles.shadow,
                  }}
                >
                  <Text
                    style={{
                      // fontFamily: "RobotoBold",
                      fontSize: 15,
                    }}
                  >
                    35-40 min
                  </Text>
                </View>
              </View>

              {/* ============================================================= */}

              {/* Restaurant Info */}
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  backgroundColor: "white",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text
                  style={{
                    flexDirection: "row",

                    fontSize: 18,
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
                      flexDirection: "row",
                    }}
                  >
                    Pizza · Salad · Burger ·
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
                  <Image
                    source={icons.star}
                    style={{
                      height: 15,
                      width: 15,
                      tintColor: COLORS.primary,
                      top: 1,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      // fontFamily: "RobotoRegular",
                      fontSize: 14,
                      color: "black",
                      marginRight: 5,
                    }}
                  >
                    4.8
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView>
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
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 10,
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
    paddingBottom: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
