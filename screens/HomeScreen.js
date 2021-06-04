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
} from "react-native";
import { useFonts } from "expo-font";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export default function HomeScreen({ navigation }) {
  // const [loaded] = useFonts({
  //   RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  //   RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
  //   RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  // });

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              left: 0,
              width: 25,
              height: 25,
              top: 10,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "80%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              top: 10,
            }}
          >
            <Text style={{ fontSize: 22 }}>Location</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              right: 0,
              width: 25,
              height: 25,
              top: 10,
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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.2.12:4000/restaurants/getRestaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => Promise.resolve(response.json()))
      .then((json) => setData(json.restaurants))
      .catch((error) => console.error(error));
    //.finally(() => setLoading(false));
  }, []);

  function renderRestaurantList() {
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text
          style={{
            fontSize: 36,
            paddingBottom: 0,
            fontWeight: "bold",
          }}
        >
          Main
        </Text>
        <Text
          style={{
            fontSize: 36,
            marginTop: -10,
            paddingBottom: 10,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>
        {/* ====================================================================== */}

        {/* Restaurants List */}
        <FlatList
          data={data}
          keyExtractor={({ _id }, index) => _id}
          showsVerticalScrollIndicator={false}
          renderItem={(
            { item } //<Text>{item.resBanner}</Text>
          ) => (
            <TouchableOpacity
              style={{ width: "100%", marginBottom: SIZES.padding }}
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
                    height: 190,
                  }}
                  borderRadius={SIZES.radius}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    height: 50,
                    width: SIZES.width * 0.3,
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    ...styles.shadow,
                  }}
                >
                  <Text
                    style={{
                      // fontFamily: "RobotoBold",
                      fontSize: 18,
                      elevation: 10,
                    }}
                  >
                    35-40 min
                  </Text>
                </View>
              </View>

              {/* ============================================================= */}

              {/* Restaurant Info */}
              <Text
                style={{
                  flexDirection: "row",
                  // fontFamily: "RobotoRegular",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingTop: 5,
                }}
              >
                {item.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 2,
                  marginBottom: 15,
                }}
              >
                {/* Rating */}
                <Image
                  source={icons.star}
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: COLORS.primary,
                    marginRight: 5,
                    top: 2,
                  }}
                />
                <Text
                  style={{
                    // fontFamily: "RobotoRegular",
                    fontSize: 15,
                    color: "black",
                  }}
                >
                  4.8 ·
                </Text>

                {/* Categories */}
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={{
                      // fontFamily: "RobotoRegular",
                      fontSize: 15,
                      paddingRight: 5,
                      color: "black",
                    }}
                  >
                    Pizza · Salad · Burger ·
                  </Text>
                  {/* {item.categories.map((categoryId) => {
                    return (
                      <View style={{ flexDirection: "row" }} key={categoryId}>
                        <Text style={{ ...FONTS.body3 }}>
                          {getCategoryNameById(categoryId)}
                        </Text>
                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                          {" "}
                          .{" "}
                        </Text>
                      </View>
                    );
                  })} */}

                  {/* Price */}
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
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {/* {renderMainCategories()} */}
      {renderRestaurantList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    marginBottom: 150,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
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
});
