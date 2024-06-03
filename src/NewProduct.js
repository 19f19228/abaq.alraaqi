import React, {useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {styles} from './Styles';

export default function NewProduct({route, navigation}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [pic, setPic] = useState(null);

  const getPhoto = () => {
    launchImageLibrary(
      {
        //mediaType: 'photo',
        //videoQuality: 'medium',
      },
      res => {
        let tempImg = Date.now() + '.jpg';
        const reference = storage().ref('images/' + tempImg);
        setImage(tempImg);

        if (res.assets) {
          setPic(res.assets[0].uri);
          reference
            .putFile(res.assets[0].uri)
            .then(res => {
              //console.log(res);
            })
            .catch(err => {
              //console.log(err);
            });
        } else {
          setErrorMsg('Failed to get image please try again...');
        }
      },
    );
  };

  const handleSubmit = () => {
    if(image == ""){
      setErrorMsg("Please add a picture")
    } else if (name !== '' && price !== 0 && price !== '') {
      firestore()
        .collection('products')
        .add({
          title: name,
          price: price,
          image: image,
          date: new Date().toDateString(),
        })
        .then(() => {
          navigation.navigate('Dashboard');
        });
    } else {
      setErrorMsg('Enter the product title and set a price.');
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
        <View style={styles.content}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            placeholder="Product Name"
            style={styles.input}
            onChangeText={val => setName(val)}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="Price"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={val => setPrice(val)}
          />
            <TouchableOpacity style={styles.btn} onPress={getPhoto}>
              <Text style={{color: '#ffffff', textAlign: 'center'}}>
                Upload product image
              </Text>
            </TouchableOpacity>
            {pic && (
              <Text style={styles.label}>Image upload successfully.</Text>
            )}
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
          <View style={styles.inline}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
