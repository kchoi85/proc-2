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
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";

export default function LocationScreen({ navigation, route }) {
  let { address, subaddress, deliveryInstruction, locationObj } = useSelector(
    (state) => state.userReducer
  );
  locationObj = JSON.stringify(locationObj);
  // React.useEffect(() => {}, []);

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
            <Text style={{ fontWeight: "bold" }}>Location</Text>
          </View>
        </View>
      </View>
    );
  }

  function locationInfo() {
    return (
      <View style={styles.body}>
        <Text>Address: {address}</Text>
        <Text>Sub Address: {subaddress}</Text>
        <Text>Delivery Instructions: {deliveryInstruction}</Text>
        <Text>Location Coords: {locationObj}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {locationInfo()}
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
});
