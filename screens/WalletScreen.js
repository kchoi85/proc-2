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
  TextInput,
} from "react-native";

// import { isIphoneX } from "react-native-iphone-x-helper";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { store } from "../redux";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

export default function WalletScreen() {
  function renderHeader() {
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  }
  function renderInfo() {
    return (
      <View>
        <Text>Info section</Text>;
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
});
