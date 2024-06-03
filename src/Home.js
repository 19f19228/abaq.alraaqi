import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './Styles';
import firestore from '@react-native-firebase/firestore';

export default function Home({ route, navigation }) {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(route.params.cart) 
  const {user} = route.params;

  useEffect(() => {
    if(route.params.update){
      setCart([])
    }
  }, [route.params.update])

  useEffect(() => {
    firestore()
      .collection('products')
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
        setProducts(tmp);
      })
      .catch(() => {
        //
      });
  }, []);

  const addToCart = product => {
    const c = cart.filter(p => p.id == product.id)
    
    if(c.length == 0){
        setCart(ol => [product, ...ol])
    }
  };

  const addToWishlist = product => {

    firestore()
      .collection('wishlist')
      .add({
        ...product,
        user: user.uid,
        date: new Date().toDateString(),
      })
      .then(() => {
        Alert.alert("Product added to your wish list!")
      });

  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>ABAQ ALRAAQI</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('ShoppingCart', { cart: cart})}>
                <Image source={require('./assets/cart.png')} style={styles.icon} />
                <Text style={{ zIndex: 1, position: 'absolute', backgroundColor: 'red', margin: 0, padding: 5, borderRadius: 15, color: '#fff' }}>{ cart?cart.length:0 }</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('./assets/usericon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image source={require('./assets/shop.jpg')} style={{
          resizeMode: 'cover',
          width: '100%',
          height: 270
        }} />

      <View style={styles.inline}>
        {products &&
          products.map(product => (
            <View style={styles.card} key={product.id}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/abaqalraaqi-df0b5.appspot.com/o/images%2F${product.image}?alt=media`,
                }}
              />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>OMR {product.price}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.btn} onPress={() => addToWishlist(product)}>
                <Text style={styles.btnText}>
                  ♥
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => addToCart(product)}>
                <Text style={styles.btnText}>
                  +
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
