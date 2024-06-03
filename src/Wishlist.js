import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from './Styles';

export default function Wishlist({route, navigation}) {
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(null) 
  const {user} = route.params;

  const addToCart = product => {
    navigation.navigate("ShoppingCart", {cart: [product]})
  };

  useEffect(() => {
    firestore()
      .collection('wishlist')
      .where("user", "==", user.uid)
      .get()
      .then(docs => {
        let tmp = [];
        docs.forEach(snapshot => {
          tmp.push({
            id: snapshot.id,
            title: snapshot.data().title,
            image: snapshot.data().image,
            price: snapshot.data().price,
            qty: 1,
          });
        });
        setData(tmp);
      })
      .catch(err => {
        //
      });
  }, [update]);

  const handleDelete = item => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to remove this product from your wishlist?',
      [
        {
          text: 'Cancel',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            firestore()
              .collection('wishlist')
              .doc(item)
              .delete()
              .then(() => {
                setUpdate(Date.now());
              })
              .catch(err => {
                Alert.alert(
                  'Sorry error while deleting the product try again.',
                );
              });
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.content}>
        {data &&
          data.map(product_item => (
            
      <View
      style={{
        ...styles.card,
        ...{width: '90%', padding: 15, alignSelf: 'center'},
      }}>
      <Image
        style={styles.image}
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/abaqalraaqi-df0b5.appspot.com/o/images%2F${product_item.image}?alt=media`,
        }}
      />
      <Text style={styles.productTitle}>{product_item.title}</Text>
      <View style={styles.inline}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => addToCart(product_item)}>
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleDelete(product_item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>))}
        <View style={{padding: '5%', margin: '5%'}}></View>
      </View>
    </ScrollView>
  );
}
