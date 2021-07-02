import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Arimated,
  Dimensions,
  StatusBar,
  FlatList,
  Platform,
  ImageBackground,
  TextInput,
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";
import { EXPRESS_SERVER } from "@env";

export default function SearchScreen({ navigation, route }) {
  const [text, setText] = React.useState("Browse restaurants, dishes, drinks");
  const [searchText, setSearchText] = React.useState("Top Categories");
  const [reses, setReses] = React.useState([]);

  React.useEffect(() => {
    if (route.params != null) {
      const { name } = route.params.item;
      setText(name);
      setSearchText(name);
      fetchData(name);
      renderSearchBar();
    }
  }, []);

  function fetchData(text) {
    if (text !== null) {
      fetch(`${EXPRESS_SERVER}/restaurants/searchRestaurants/${text}`)
        .then((response) => response.json())
        .then((resJson) => {
          setReses(resJson.restaurantInfo); // set fetched restaurants into reses array
        })
        .catch((err) => console.log(err));
    }
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

  function renderSearchBar() {
    /*
    Initially, when reses.length ==0, we render this
    */
    const renderCateg = (item) => {
      // if search tab is empty
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingBottom: 8, // space between category cards
          }}
        >
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => {
              setText(item.name);
              setSearchText(item.name);
              fetchData(item.name); //set reses
            }}
          >
            <Image source={{ uri: item.img }} style={styles.categoryImage} />
            <Text
              style={{
                position: "absolute",
                left: "8%",
                bottom: "5%",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    /*
    after fetchData() => returns array of 'reses', which if not empty, then we render this
    */
    const renderReses = (item) => {
      //  {DEBUG} console.log(item);
      return (
        <View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RestaurantScreen", { item })}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image
                  source={{ uri: `${EXPRESS_SERVER}/${item.resBanner}` }}
                  resizeMode="cover"
                  style={{ width: 80, height: 80 }}
                />
              </View>
              <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{}}>{item.type}</Text>
                <Text style={{ color: "gray" }}>{item.deliveryTime} ·</Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: "5%",
                  bottom: "40%",
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
          </TouchableOpacity>
        </View>
      );
    };

    if (text === "Browse restaurants, dishes, drinks") {
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
        {
          _id: 11,
          name: "Pizza",
          img: `${EXPRESS_SERVER}/uploads/categories/Pizza.png`,
        },

        {
          _id: 12,
          name: "Desserts",
          img: `${EXPRESS_SERVER}/uploads/categories/Desserts.png`,
        },
        {
          _id: 13,
          name: "Fast Food",
          img: `${EXPRESS_SERVER}/uploads/categories/Fast_Food.png`,
        },
        {
          _id: 14,
          name: "Ramen",
          img: `${EXPRESS_SERVER}/uploads/categories/Ramen.png`,
        },
        {
          _id: 15,
          name: "Ice Cream",
          img: `${EXPRESS_SERVER}/uploads/categories/Ice_Cream.png`,
        },
        {
          _id: 16,
          name: "Ethiopian",
          img: `${EXPRESS_SERVER}/uploads/categories/Ethiopian.png`,
        },
        {
          _id: 17,
          name: "Halal",
          img: `${EXPRESS_SERVER}/uploads/categories/Halal.png`,
        },
        {
          _id: 18,
          name: "Indian",
          img: `${EXPRESS_SERVER}/uploads/categories/Indian.png`,
        },
        {
          _id: 19,
          name: "Pasta",
          img: `${EXPRESS_SERVER}/uploads/categories/Pasta.png`,
        },
        {
          _id: 20,
          name: "Italian",
          img: `${EXPRESS_SERVER}/uploads/categories/Italian.png`,
        },
      ];

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
                onChangeText={(text) => {
                  setText(text);
                  setSearchText(text);
                  fetchData(text);
                }}
                placeholder={text}
              />
            </View>
            {/* space between Top categories and searchBar */}
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontSize: 18, paddingLeft: 5 }}>{searchText}</Text>
            </View>
          </View>

          <FlatList
            data={categories}
            key={"_"}
            keyExtractor={({ _id }) => "_" + _id}
            renderItem={({ item }) => renderCateg(item)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 260,
            }}
          />
        </View>
      );
    } else {
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
                onChangeText={(text) => {
                  setText(text);
                  setSearchText(text);
                  fetchData(text);
                }}
                value={text}
              />
            </View>
            <View style={{ paddingTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18, paddingLeft: 5 }}>
                  {reses.length} Result(s) for {searchText}
                </Text>
              </View>
              <View style={styles.backToCategories}>
                <TouchableOpacity
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setText("Browse restaurants, dishes, drinks");
                    setSearchText("Top categories");
                    // navigation.push("SearchScreen");
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Image
                      source={icons.back}
                      style={{ width: 12, height: 12, marginRight: 5 }}
                    />
                    <Text>Categories</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={reses}
            key={"#"}
            keyExtractor={({ _id }) => "#" + _id}
            renderItem={({ item }) => renderReses(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 10,
            }}
          />
        </View>
      );
    }
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
    backgroundColor: COLORS.lightGray4,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  backToCategories: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 35,
    borderRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    top: "50%",
    elevation: 2,
  },
  categoryCard: {
    width: Dimensions.get("screen").width / 2.3,
    height: 160,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },

  card: {
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: "white",
    marginBottom: 5, //between each cards
  },
  cardImage: {
    width: "100%",
    height: 145,
  },
});
