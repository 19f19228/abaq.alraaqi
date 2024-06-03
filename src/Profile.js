import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {styles} from './Styles';

export default function Profile({route, navigation}) {
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);
  const {user} = route.params;

  useEffect(() => {
    firestore()
      .collection('users_profiles')
      .doc(user.uid)
      .get()
      .then(doc => {
        setData(doc.data());
        loadUserOrders();
      })
      .catch(() => {
        //
      });
  }, []);

  const loadUserOrders = () => {
    firestore()
      .collection('orders')
      .where('user_id', '==', user.uid)
      .get()
      .then(docs => {
        let tmp = [];
        docs.forEach(snapshot => {
          tmp.push({
            id: snapshot.id,
            date: snapshot.data().date,
            total: snapshot.data().total,
            payment: snapshot.data().payment,
            items: snapshot.data().items,
            user_id: snapshot.data().user_id,
          });
        });
        setOrders(tmp);
      })
      .catch(() => {
        //
      });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        //
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.content}>

        <Text style={styles.label}>{data && data.name}</Text>

        <Text style={styles.label}>Mobile: {data && data.mobile}</Text>

        <Text style={styles.label}>E-Mail: {user && user.email}</Text>

        <Text style={styles.label}>Address: {data && data.address}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("UpdateProfile")}>
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Wishlist")}>
            <Text style={styles.btnText}>Whishlist</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>


        <Text style={{...styles.title, ...{textAlign: 'left'}}}>
          My Previous Orders:
        </Text>

        {orders &&
          orders.map(o => (
            <View
              key={o.id}
              style={{...styles.card, ...{width: '90%', padding: 15}}}>
              <Text style={{ color: '#013236' }}>{o.date}</Text>
              <View style={styles.line}></View>
              {o.items &&
                o.items.map(item => (
                  <View key={item.id} style={styles.cartItem}>
                    <Text style={styles.cartItemText}>{item.title}</Text>
                    <Text style={{padding: 5, width: '10%', color: '#000'}}>
                      x{item.qty}
                    </Text>
                    <Text style={{padding: 5, width: '25%', color: '#000'}}>
                      OMR {item.price}
                    </Text>
                  </View>
                ))}
              <View style={styles.line}></View>
              <Text style={{fontSize: 16, color: '#000', marginBottom: 15}}>
                Payment Method: {o.payment == 'cod'?'Card on delivery':'Bank transfer'}
              </Text>
              <Text style={{fontSize: 16, color: '#000', marginBottom: 15}}>
                Total: OMR {o.total}
              </Text>
            </View>
          ))}
        <View style={{padding: '5%', margin: '5%'}}></View>
      </View>
    </ScrollView>
  );
}
