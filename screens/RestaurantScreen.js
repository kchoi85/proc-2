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
        source={images.pizza_restaurant}
        style={{
          width: "100%",
          height: 200,
          flexDirection: "row",
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
              height: 45,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
              marginHorizontal: SIZES.padding * 7,
              marginTop: SIZES.padding,
            }}
          >
            <Text>18 Yonge St.</Text>
          </View>
        </View>
        <View>
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
              marginTop: SIZES.padding,
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
        <View style={{ marginLeft: 15, marginTop: 5, marginBottom: 30 }}>
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

            <View>
              <Text>4.8 (200+ ratings) · Pizza</Text>
            </View>
          </View>
          <View>
            <Text style={{ color: "grey" }}>Open until 3:30am</Text>
          </View>
          <View>
            <Text>{restaurant?.description} json.details</Text>
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
            marginLeft: 15,
            marginBottom: 15,
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
            top: screenHeight * 0.915,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.black,
              height: 50,
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
    <SafeAreaView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        {renderHeader()}
        {imageHeader()}
      </View>
      <View>
        <ScrollView>{menuItem()}</ScrollView>
      </View>

      {menuCart()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  menus: {
    flexDirection: "row",
    marginLeft: 15,
    marginBottom: 20,
  },
});
