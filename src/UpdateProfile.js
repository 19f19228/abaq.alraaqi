import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from './Styles';

export default function UpdateProfile({ route, navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const {user} = route.params;

  useEffect(() => {
    firestore()
      .collection('users_profiles')
      .doc(user.uid)
      .get()
      .then(doc => {
        setName(doc.data().name);
        setMobile(doc.data().mobile);
        setAddress(doc.data().address);
      })
      .catch(() => {
        //
      });
  }, []);

  const handleUpdate = () => {
    let enable = true;

    if (name === '') {
      setErrorMsg('Please fill in all the required fields.');
      enable = false;
    }

    if (isNaN(mobile) || mobile.length < 7) {
      setErrorMsg('Please provide a valid mobile number.');
      enable = false;
    }

    if (enable) {
        firestore()
            .collection('users_profiles')
            .doc(user.uid)
            .update({
              name: name,
              address: address,
              mobile: mobile,
            })
            .then(() => {
                navigation.navigate("Home")
            })
            .catch(err => {
                setErrorMsg("Something went wrong, try again..")
            })
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
            value={name}
            onChangeText={val => setName(val)}
          />

          <Text style={styles.label}>Mobile</Text>

          <TextInput
            placeholder="Mobile"
            style={styles.input}
            value={mobile}
            onChangeText={val => setMobile(val)}
          />

          <Text style={styles.label}>Address</Text>

          <TextInput
            placeholder="Address"
            value={address}
            style={styles.input}
            onChangeText={val => setAddress(val)}
          />

          {errorMsg && (
            <Text style={{color: 'red', padding: 5, margin: 3}}>
              {errorMsg}
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
