import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  TextInput,
  SafeAreaView,
} from "react-native";
import { icons, COLORS, SIZES, FONTS, images } from "../constants";
import { useSelector } from "react-redux";

import { store } from "../redux/index";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = React.useState(null);
  const [id, setId] = React.useState(null); //email
  const [phone, setPhone] = React.useState(null);
  const [pass, setPass] = React.useState(null);
  const [passCnfrm, setPassCnfrm] = React.useState(null);
  const [passMatch, setPassMatch] = React.useState(null);

  const { user, appError, userLoggedIn } = useSelector(
    (state) => state.userReducer
  );

  // {DEBUG} useSelector((state) => console.log(state.userReducer));

  // if user registers successfully, userLoggedin == true.
  // since this code is re-run, we check if userLoggedin==true
  // if true, go back to account page
  React.useEffect(() => {
    if (userLoggedIn) {
      navigation.goBack();
    }
  });

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
            <Text style={{ fontWeight: "bold" }}>Client Register</Text>
          </View>
        </View>
      </View>
    );
  }

  const onUserRegister = async ({ email, name, password, phone, address }) => {
    try {
      const response = await axios.post(
        "http://192.168.2.12:4000/users/registerUser",
        {
          email,
          name,
          password,
          phone,
          address,
        }
      );
      store.dispatch({ type: "DO_REGISTER", payload: response.data });
    } catch (error) {
      store.dispatch({ type: "ON_ERROR", payload: error });
    }
  };

  function renderRegister() {
    return (
      <View style={styles.body}>
        <View>
          <TextInput
            style={styles.creds}
            onChangeText={setName}
            placeholder="Full Name"
          />

          <TextInput
            style={styles.creds}
            onChangeText={setId}
            placeholder="Email Address"
          />

          <TextInput
            style={styles.creds}
            onChangeText={setPhone}
            placeholder="Phone Number"
          />

          <TextInput
            style={styles.creds}
            onChangeText={(e) => {
              setPass(e);
              if (e === passCnfrm) {
                setPass(e);
                setPassMatch(null);
              } else {
                setPass(e);
                setPassMatch("Password does not match");
              }
            }}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.creds}
            onChangeText={(e) => {
              setPassCnfrm(e);
              if (e === pass) {
                setPassCnfrm(e);
                setPassMatch(null);
              } else {
                setPassCnfrm(e);
                setPassMatch("Password does not match");
              }
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text>{passMatch}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 110,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => {
              // if passMatch (which should be null if pass === passCnfrm) is not null
              // or name / id / phone / pass / passCnfrm fields are empty
              if (passMatch || !name || !id || !phone || !pass || !passCnfrm) {
                console.log("not registered");
              }
              // else all good to register
              // const { email, name, password, phone, address } = req.body;
              else {
                onUserRegister({
                  email: id,
                  name: name,
                  password: pass,
                  phone: phone,
                  address: "",
                });
              }
            }}
          >
            <Text style={{ color: "#FFF" }}>Register</Text>
          </TouchableOpacity>

          <View style={styles.credInfo}>
            <Text>
              fields: {name} - {id} - {phone} - {pass} - {passCnfrm} -
            </Text>
            <Text>message: {user?.message}</Text>
            <Text>_id: {user?._id}</Text>
            <Text>token: {user?.token}</Text>
            <Text>error: {appError?.message}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRegister()}
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
  creds: {
    borderBottomWidth: 1,
    marginBottom: 3,
    marginTop: 20,
  },
  credInfo: {
    paddingTop: 20,
    color: "grey",
  },
});
