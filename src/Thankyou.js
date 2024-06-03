import React, { useEffect } from 'react';
import {BackHandler, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Styles';

export default function Thankyou({ route, navigation }) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function (e) {
        navigation.navigate("Home", { update: Date.now() })
    })
  }, [])

  return (
    <ScrollView>
      <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
        <View style={styles.content}>
            <Image source={require('./assets/abglogo500.png')} style={styles.logo} />
            <Text style={styles.title}>Thank you, we are proccing your order and we'll contact you soon, stay tuned!</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home", { update: Date.now() })}>
            <Text style={styles.btnText} >
                Home
            </Text>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
