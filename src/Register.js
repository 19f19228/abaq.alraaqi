import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {styles} from './Styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRegister = () => {
    let enable = true;

    if (name === '' || email === '' || password === '') {
      setErrorMsg('Please fill in all the required fields.');
      enable = false;
    }

    if (isNaN(mobile) || mobile.length < 7) {
      setErrorMsg('Please provide a valid mobile number.');
      enable = false;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      enable = false;
    }

    if (repeatedPassword !== repeatedPassword) {
      setErrorMsg('Password are not matched try again.');
      enable = false;
    }

    if (enable) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firestore()
            .collection('users_profiles')
            .doc(res.user.uid)
            .set({
              name: name,
              address: address,
              mobile: mobile,
            })
            .then(() => {
              //console.log('User added!');
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorMsg('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            setErrorMsg('That email address is invalid!');
          } else {
            setErrorMsg('Something went wrong, try again!');
          }
        });
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={val => setName(val)}
          />

          <Text style={styles.label}>Mobile</Text>

          <TextInput
            placeholder="Mobile"
            style={styles.input}
            onChangeText={val => setMobile(val)}
          />

          <Text style={styles.label}>Address</Text>

          <TextInput
            placeholder="Address"
            style={styles.input}
            onChangeText={val => setAddress(val)}
          />

          <Text style={styles.label}>E-mail</Text>

          <TextInput
            placeholder="E-mail"
            style={styles.input}
            onChangeText={val => setEmail(val)}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
          />

          <Text style={styles.label}>Repeat Password</Text>

          <TextInput
            placeholder="Repeat Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={val => setRepeatedPassword(val)}
          />

          {errorMsg && (
            <Text style={{color: 'red', padding: 5, margin: 3}}>
              {errorMsg}
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleRegister}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
