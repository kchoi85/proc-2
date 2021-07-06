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
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";

// import { isIphoneX } from "react-native-iphone-x-helper";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { EXPRESS_SERVER, GOOGLE_MAPS_API } from "@env";

export default function RestaurantScreen({ route, navigation }) {
  const [restaurant, setRestaurant] = React.useState(null);
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    let { item, currentLocation } = route.params;
    setRestaurant(item);
    setLocation(currentLocation);
  }, []);

  const { menu } = useSelector((state) => state.userReducer); // total of shopping cart

  function renderHeader() {
    return (
      <ImageBackground
        source={{
          uri: `${EXPRESS_SERVER}/${restaurant?.resBanner}`,
        }}
        style={{
          width: "100%",
          height: 200,
        }}
      >
        <View style={{ flexDirection: "row" }}>
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
              marginTop: StatusBar.currentHeight + 5,
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
              marginRight: SIZES.padding * 2,
              marginTop: StatusBar.currentHeight + 5,
              position: "absolute",
              right: 0,
            }}
            onPress={() => store.dispatch({ type: "DEV_RESET" })}
          >
            <Image
              source={icons.list}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  function imageHeader() {
    return (
      //==========Banner Image
      <View>
        {/* <Image
          source={images.pizza_restaurant}
          style={{ width: "100%", height: 180 }}
        /> */}
        {/*========== stars + ratings + pizza*/}
        <View style={styles.body}>
          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {restaurant?.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={icons.star}
              style={{
                height: 15,
                width: 15,
                tintColor: COLORS.black,
                marginTop: 2,
                marginRight: 5,
              }}
            />

            <Text>{restaurant?.rating} (200+ ratings) · </Text>
            <Text>{restaurant?.type}</Text>
          </View>
          <Text>{restaurant?.description}</Text>
          <Text style={{ color: "#666666", paddingBottom: 20 }}>
            Open until 3:30am
          </Text>

          <View
            style={{
              width: "100%",
              backgroundColor: "#FF9D9D",
              height: 30,
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <Text>30% discount for all</Text>
          </View>
        </View>
      </View>
    );
  }

  function menuItem() {
    //item=menuItem
    const renderEachMenu = (item) => (
      //|| {item.price} || {item.details}
      <View style={styles.menus}>
        <TouchableOpacity
          style={{ width: "70%", justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("ItemScreen", item);
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {item.item}
          </Text>

          <Text style={{ paddingTop: 5, color: "grey" }}>{item.details}</Text>
          <Text style={{ paddingTop: 5 }}>${item.price}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Image
            source={images.pizza}
            resizeMode="contain"
            style={{
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            paddingLeft: SIZES.padding * 2,
          }}
        >
          Picked for you
        </Text>
        <FlatList
          data={restaurant?.menu}
          keyExtractor={({ _id }) => _id}
          // keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => renderEachMenu(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    );
  }

  // click button to go to checkout page
  function menuCart() {
    const screenHeight = Dimensions.get("screen").height;

    let resId = restaurant?._id;
    let fullcart = {
      restaurantId: resId,
      menu: menu,
    };

    if (menu.length > 0) {
      return (
        <View
          style={{
            position: "absolute",
            paddingHorizontal: SIZES.padding * 8,
            bottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.black,
              height: 50,
              borderRadius: 30,
              paddingHorizontal: SIZES.padding * 7,
            }}
            onPress={() => {
              navigation.navigate("CheckOutScreen", fullcart);
            }}
          >
            <Text style={{ color: "white" }}>
              {menu.length} item(s) in cart
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View style={styles.container} showsHorizontalScrollIndicator={false}>
      <View>
        {renderHeader()}
        {imageHeader()}
      </View>
      <View>
        <ScrollView>{menuItem()}</ScrollView>
      </View>

      {menuCart()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  body: {
    paddingTop: 5,
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding * 2,
    paddingBottom: 15,
  },
  menus: {
    flexDirection: "row",
    paddingLeft: SIZES.padding * 2,
    marginBottom: 10, // size between cards
  },
});
