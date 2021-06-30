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

import RNLocation from "react-native-location";

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = React.useState(null);
  // RNLocation.configure({
  //   distanceFilter: 20.0, // move 20m, distance resets
  // });

  // let permission = RNLocation.requestPermission({
  //   ios: "whenInUse",
  //   android: {
  //     detail: "coarse",
  //     rationale: {
  //       title: "We need to access your location",
  //       message: "We use your location to show where you are on the map",
  //       buttonPositive: "OK",
  //       buttonNegative: "Cancel",
  //     },
  //   },
  // }).then((res) => console.log(res));
  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse",
      rationale: {
        title: "We need to access your location",
        message: "We use your location to show where you are on the map",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
      },
    },
  }).then(RNLocation.getLatestLocation({ timeout: 100 }));

  // .then((granted) => {
  //   if (granted) {
  //     RNLocation.getLatestLocation({ timeout: 10000 }).then((curLoc) => {
  //       console.log(curLoc);
  //     });
  //   }
  // });

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
        {/* <Text>Longitude: {location?.coords.longitude}</Text>
        <Text>Latitude: {location?.coords.latitude}</Text>
        <Text>Timestamp: {location?.timestamp}</Text> */}
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
