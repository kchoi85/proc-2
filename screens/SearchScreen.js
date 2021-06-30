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
import { useSelector } from "react-redux";

export default function SearchScreen({ navigation }) {
  const [text, setText] = React.useState("Search here");
  const [reses, setReses] = React.useState([]);
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
            <Text style={{ fontWeight: "bold" }}>Browse Restaurants</Text>
          </View>
        </View>
      </View>
    );
  }
  function renderSearchBar() {
    const renderReses = (item) => {
      //  {DEBUG} console.log(item);
      return (
        <View style={{ paddingBottom: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RestaurantScreen", { item })}
          >
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    function fetchData(text) {
      setText(text);
      fetch(`http://192.168.2.12:4000/restaurants/searchRestaurants/${text}`)
        .then((response) => response.json())
        .then((resJson) => {
          setReses(resJson.restaurantInfo); // set fetched restaurants into reses array
        })
        .catch((err) => console.log(err));
    }
    return (
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            fetchData(text);
          }}
          placeholder={text}
        />
        <FlatList
          data={reses}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => renderReses(item)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 50,
            paddingBottom: 30,
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
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
  input: {
    height: 30,
    borderWidth: 0.5,
  },
});
