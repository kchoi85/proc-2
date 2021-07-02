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
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { EXPRESS_SERVER } from "@env";

export default function FavoritesScreen({ navigation }) {
  let { favRes } = useSelector((state) => state.userReducer);
  // useSelector((state) => console.log(state.userReducer));
  const [reses, setReses] = React.useState([]);
  const [searchText, setSearchText] = React.useState(
    "Search your favorite restaurants"
  );

  React.useEffect(() => {
    setReses(favRes);
  });

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
      // setOrdersArray(
      //   ordersArray.filter((item) => item.restaurantInfo.name.match(regex))
      // );
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
              Your favorite Restaurants
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFavReses() {
    const renderFavs = (item) => {
      /*
        address: "2 Yonge St"
        description: "Description of Shop # 2"
        email: "shop2@gmail.com"
        menu: (4) [{…}, {…}, {…}, {…}]
        name: "Shop # 2"
        online: true
        phone: 2345678901
        resBanner: "uploads\\1622054507326vax.PNG"
        type: "chinese"
        _id: "60ae966b0d9d1e10a8cd0e63"
      */
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
                    type: "DO_UNFAVORITE",
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
                    tintColor: "#FF5353",
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
                  style={{ alignItems: "center", justifyContent: "center" }}
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
    };

    return (
      <View style={styles.body}>
        <FlatList
          data={reses}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => renderFavs(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 5, paddingBottom: 260 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      {renderFavReses()}
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

    marginBottom: 10, //between each cards
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
});
