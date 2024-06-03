import React, { useEffect } from 'react'
import { Dimensions, Image, ImageBackground, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { styles } from './Styles'

export default function Welcome({ route, navigation }) {
    useEffect(() => {
        if(route.params.user){
            firestore()
            .collection('system_admins')
            .doc(route.params.user.uid)
            .get()
            .then(doc => {
                if(doc.data()){
                    navigation.navigate("Dashboard")
                } else {
                    navigation.navigate("Home")
                }
            })
            .catch(err => {
                navigation.navigate("Login")
            })
        } else {
            navigation.navigate("Login")
        }
    }, [])

  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        resizeMode: "cover",
        height: Dimensions.get("screen").height,
        width: '100%'
    }}>
        <Image source={require('./assets/abglogo500.png')} style={styles.logo} />
    </ImageBackground>
  )
}
