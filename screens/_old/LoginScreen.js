import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, Button, View } from 'react-native';
import { CredentialsContext } from '../../App';
import { Formik } from 'formik';


export const handleErrors = async (res) => {
    if (!res.ok) {
        const { message } = await res.json();
        throw Error(message);
    }
    return res.json();
}

export default function LoginScreen(props) {
    const { navigation } = props
    const [email, setEmailInput] = React.useState('');
    const [password, setPasswordInput] = React.useState('');
    const [err, setError] = useState("");
    //const [, setCredentials] = useContext(CredentialsContext);

    const loginHandler = () => {
        //e.preventDefault(); //stops reloading page
        fetch(`http://192.168.2.12:4000/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(handleErrors)
            .then(user => {
                if (user) {
                    navigation.navigate("Welcome");
                }
            })
            .catch(err => setError(err.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>deliveryTO</Text>
            <Formik>
                
                <View style={styles.container}>
                
                    <TextInput
                        style={styles.input}
                        placeholder='Email.'
                        onChangeText={setEmailInput}
                        value={email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCompleteType='password'
                        style={styles.input}
                        placeholder='Password.'
                        onChangeText={setPasswordInput}
                        value={password}
                    />
                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={loginHandler}>
                        <View><Text>Login.</Text></View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {navigation.navigate("Register")}}>
                        <Text>Register.</Text>
                    </TouchableHighlight>

                </View>
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    openButton: {
        width: 300,
        borderColor: "#fff",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        elevation: 2
    },
    input: {
        height: 45,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10
    },
    text: {
        fontSize: 30,
        padding: 125
    }
});
