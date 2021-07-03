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
  TextInput,
  FlatList,
  ScrollView,
  LogBox,
  Modal,
  Pressable,
} from "react-native";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { EXPRESS_SERVER } from "@env";
import axios from "axios";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export default function HomeScreen({ navigation }) {
  // {DEBUG} console.log(useSelector((state) => state.userReducer));
  //const [isLoading, setLoading] = useState(true);
  const [restaurantsArr, setRestaurants] = useState([]);

  var { openedFirstTime } = useSelector((state) => state.userReducer);
  const [initialSetup, setInitialSetup] = React.useState(openedFirstTime);
  const [actionPressed, setActionPressed] = useState(false);

  const [signinButton, setSignin] = React.useState(false);

  const [fName, setFName] = React.useState(null);
  const [lName, setLName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const { userLoggedIn } = useSelector((state) => state.userReducer);
  const [loggedin, setLoggedin] = React.useState(false);

  useEffect(() => {
    setLoggedin(userLoggedIn);
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
  }, [userLoggedIn]);

  const onUserLogin = async ({ email, password }) => {
    const response = await axios.post(`${EXPRESS_SERVER}/users/loginUser`, {
      email,
      password,
    });
    store.dispatch({ type: "DO_LOGIN", payload: response.data });
  };

  const onUserRegister = async ({ email, name, password, phone }) => {
    try {
      const response = await axios.post(
        `${EXPRESS_SERVER}/users/registerUser`,
        {
          email,
          name,
          password,
          phone,
        }
      );
      store.dispatch({ type: "DO_REGISTER", payload: response.data });
    } catch (error) {
      store.dispatch({ type: "ON_ERROR", payload: error });
    }
  };

  function renderModal() {
    return (
      <View>
        <Modal animationType="fade" transparent={false} visible={initialSetup}>
          {actionPressed === true ? (
            loggedin === true ? (
              <View>
                <TouchableOpacity
                  onPress={() => store.dispatch({ type: "DEV_RESET" })}
                >
                  <Text>RESET</Text>
                </TouchableOpacity>
              </View>
            ) : signinButton === true ? (
              <View style={styles.modal2}>
                {/* ========Header========= */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity onPress={() => setSignin(false)}>
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 30,
                        width: 100,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Sign Up
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#FF5353",
                      borderRadius: 30,
                      width: 100,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Sign In
                    </Text>
                  </View>
                </View>
                {/* ========Sign Up Body (First and Last Name) ========= */}
                <View style={styles.modal2Body}>
                  {/* ========Sign Up Body (Email) ========= */}
                  <View>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Email
                    </Text>
                    <TextInput
                      style={styles.modal2Input}
                      placeholder="Elena.Sim@gmail.com"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                  {/* ========Sign Up Body (Password) ========= */}
                  <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Password
                    </Text>
                    <TextInput
                      style={styles.modal2Input}
                      placeholder="**********"
                      secureTextEntry={true}
                      onChangeText={(text) => setPassword(text)}
                    />
                  </View>
                </View>
                {/* =========Sign In Button=========*/}
                <View style={styles.modal2Signin}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      onUserLogin({ email, password });
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 18,
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.modal2}>
                {/* ========Header========= */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FF5353",
                      borderRadius: 30,
                      width: 100,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Sign Up
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSignin(true)}>
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 30,
                        width: 100,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 20,
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Sign In
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* ========Sign Up Body (First and Last Name) ========= */}
                <View style={styles.modal2Body}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: 20,
                    }}
                  >
                    <View style={{ width: "48%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          paddingBottom: 5,
                        }}
                      >
                        First Name
                      </Text>
                      <TextInput
                        style={styles.modal2Input}
                        placeholder="Elena"
                        onChangeText={(text) => setFName(text)}
                      />
                    </View>
                    <View style={{ width: "48%" }}>
                      <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                        Last Name
                      </Text>
                      <TextInput
                        style={styles.modal2Input}
                        placeholder="Sim"
                        onChangeText={(text) => setLName(text)}
                      />
                    </View>
                  </View>
                  {/* ========Sign Up Body (Email) ========= */}
                  <View>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Email
                    </Text>
                    <TextInput
                      style={styles.modal2Input}
                      placeholder="Elena.Sim@gmail.com"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                  {/* ========Sign Up Body (Phone) ========= */}
                  <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Phone Number
                    </Text>
                    <TextInput
                      style={styles.modal2Input}
                      placeholder="123-456-7890"
                      keyboardType="numeric"
                      onChangeText={(text) => setPhone(text)}
                    />
                  </View>
                  {/* ========Sign Up Body (Password) ========= */}
                  <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                      Password
                    </Text>
                    <TextInput
                      style={styles.modal2Input}
                      placeholder="**********"
                      secureTextEntry={true}
                      onChangeText={(text) => setPassword(text)}
                    />
                  </View>
                </View>
                {/* =========Sign Up Button=========*/}
                <View style={styles.modal2Signin}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      onUserRegister({
                        email: email,
                        name: fName,
                        password: password,
                        phone: phone,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 18,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ) : (
            <View style={styles.modal}>
              <View
                style={{
                  position: "absolute",
                  bottom: "63%",
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Welcome to DeliveryTO!
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: "black",
                    textAlign: "center",
                    paddingTop: 5,
                    paddingLeft: 50,
                    paddingRight: 50,
                    lineHeight: 23,
                  }}
                >
                  Let's help local restaurants get back to business
                </Text>
              </View>
              <Image
                source={images.main_icon}
                style={{
                  height: 200,
                  width: 250,
                  position: "absolute",
                  bottom: "28%",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "18%",
                  backgroundColor: "#FF5353",
                  borderRadius: 30,
                  height: 50,
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setActionPressed(true);
                    // setInitialSetup(!initialSetup);
                    // store.dispatch({ type: "DO_INITIAL_APP_REGISTER" });
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
                  >
                    Let's order some food
                  </Text>
                </Pressable>
              </View>
              <View style={{ position: "absolute", bottom: "8%" }}>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    lineHeight: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  By pressing Register or Sign up, you agree to our Terms and
                  Conditions and Privacy Statement
                </Text>
              </View>
            </View>
          )}
        </Modal>
      </View>
    );
  }

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
      {renderModal()}
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
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
    backgroundColor: "white",
  },
  modal2: {
    paddingTop: 40,
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
  },
  modal2Body: { paddingTop: 30 },
  modal2Input: {
    height: 50,
    paddingLeft: 20,
    fontWeight: "bold",
    backgroundColor: "#ededed",
    borderRadius: 10,
  },
  modal2Signin: {
    marginTop: 40,
    backgroundColor: "#FF5353",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
