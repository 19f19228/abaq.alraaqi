import React, { useState } from 'react'
import { Button, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './Styles'
import auth from '@react-native-firebase/auth'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = () => {
    setErrorMsg('')
    if(email !== '' && password !== ''){
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                //console.log('User account created & signed in!');
            })
            .catch(error => {
                setErrorMsg("wrong email or password.")
          });
    } else {
        setErrorMsg("Please enter you email and password.")
    }
  };

  return (<ScrollView>
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
    <View style={styles.content}>
        <Image source={require('./assets/abglogo500.png')} style={styles.logo} />
        <Text style={styles.title}>Login to your account</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput onChangeText={val => setEmail(val)} placeholder='E-mail' style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} onChangeText={val => setPassword(val)}  />
        <Text style={{ color: 'red' }}>{errorMsg }</Text>
        <View style={styles.inline}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </View>

    </View>
    </ImageBackground>
  </ScrollView>
  )
}