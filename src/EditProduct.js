import React, {useEffect, useState} from 'react';
import {
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

export default function EditProduct({route, navigation}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [pic, setPic] = useState(null);
  const product = route.params.product;

  useEffect(() => {
    firestore()
      .collection('products')
      .doc(product)
      .get()
      .then(doc => {
        console.log(doc.data().price);
        setName(doc.data().title);
        setPrice(doc.data().price);
        setImage(doc.data().image);
      })
      .catch(() => {
        //
      });
  }, []);

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
    } else if (name !== '' && price !== 0 && price !== "") {
      firestore()
        .collection('products')
        .doc(product)
        .update({
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
            value={name}
            onChangeText={val => setName(val)}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder={" "+price}
            style={styles.input}
            value={price}
            onChangeText={val => setPrice(val)}
            keyboardType="numeric"
          />
          <Image
            style={styles.image}
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/abaqalraaqi-df0b5.appspot.com/o/images%2F${image}?alt=media`,
            }}
          />
          <TouchableOpacity style={styles.btn} onPress={getPhoto}>
            <Text style={{color: '#ffffff', textAlign: 'center'}}>
              Upload product image
            </Text>
          </TouchableOpacity>
          {pic && <Text style={styles.label}>Image upload successfully.</Text>}
          {errorMsg && <Text style={{color: 'red'}}>{errorMsg}</Text>}
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
