import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Button, View } from 'react-native';
import { CredentialsContext } from '../App';
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

    const registerHandler = () => {
        if (email == "" || password == "") {
            navigation.navigate('Register')
            return setError('Please fill required forms')
        }

        //e.preventDefault(); //stops reloading page
        fetch(`http://192.168.2.12:4000/register`, {
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
            .then(result => {
                navigation.navigate("Login")
            })
            .catch(err => {
                setError(err.message);
            })
    }

    return (
        <View style={styles.container}>
            
        <Formik>
            <View style={styles.container}>
            
                <TextInput
                    style={styles.input}
                    placeholder='Email.'
                    onChangeText={setEmailInput}
                    value={email}
                />
                <TextInput
                    type='password'
                    style={styles.input}
                    placeholder='Password.'
                    onChangeText={setPasswordInput}
                    value={password}
                />
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={registerHandler}>
                    <View><Text>Register.</Text></View>
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
        padding: 8,
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
});
