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

export default function HelpScreen({ navigation }) {
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
            <Text style={{ fontWeight: "bold" }}>Help</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBody() {
    let AUTHOR = "Kihoon Choi";
    let RELEASE_DATE = "July 2021";
    let RELEASE_VERSION = "1.0.1";
    let CUSTOMER_SUP_PHONE = "519-871-4038";
    let HELP_EMAIL = "help@deliveryto.com";
    let TODAYS_DATE = new Date();
    let CURRENT_YEAR = new Date().getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    TODAYS_DATE = monthNames[TODAYS_DATE.getMonth()];

    return (
      <View style={styles.body}>
        <Text>App Author: {AUTHOR}</Text>
        <Text>Release Date: {RELEASE_DATE}</Text>
        <Text>Release Version: {RELEASE_VERSION}</Text>
        <Text>
          Current Date: {TODAYS_DATE}, {CURRENT_YEAR}
        </Text>
        <Text>Customer Support: {CUSTOMER_SUP_PHONE}</Text>
        <Text>Help Email: {HELP_EMAIL}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderBody()}
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
