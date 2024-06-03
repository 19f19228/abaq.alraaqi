import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { styles } from './Styles'

export default function OrderDetails({ route, navigation }) {
  const order_item = route.params.order_item;
  const [data, setData] = useState(null)

  useEffect(() => {
    if(order_item){
      firestore()
        .collection('users_profiles')
        .doc(order_item.user_id)
        .get()
        .then(doc => {
          setData(doc.data());
        })
        .catch(() => {
          //
        });
    }
    
  }, [])
  

  const deleteOrder = () => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
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
              .collection('orders')
              .doc(order_item.id)
              .delete()
              .then(() => {
                navigation.navigate("Dashboard", { update: Date.now() })
              })
              .catch(() => {
                Alert.alert(
                  'Sorry error while deleting this order try again.',
                );
              });
          },
        },
      ],
    );
  }

  return (
    <ScrollView>
      <View style={{...styles.card, ...{width: '90%', padding: 15, alignSelf: 'center'}}}>
            <Text style={styles.label}>{data && data.name}</Text>

            <Text style={styles.label}>Mobile: {data && data.mobile}</Text>

            <Text style={styles.label}>Address:</Text>

            <Text style={styles.label}>{data && data.address}</Text>
      </View>

      {order_item && <View style={{...styles.card, ...{width: '90%', padding: 15, alignSelf: 'center'}}}>
      <Text style={{ color: '#013236' }}>{order_item.date}</Text>
      <View style={styles.line}></View>
      {order_item.items && order_item.items.map(item => <View key={item.id} style={styles.cartItem}>
          <Text style={styles.cartItemText}>{item.title}</Text>
          <Text style={{padding: 5, width: '10%', color: '#000'}}>x{item.qty}</Text>
          <Text style={{padding: 5, width: '25%', color: '#000'}}>OMR {item.price}</Text>
      </View>)}
      <View style={styles.line}></View>
      <Text style={{fontSize: 16, color: '#000', marginBottom: 15}}>Payment Method: {order_item.payment == 'cod'?'Card on delivery':'Bank transfer'}</Text>
      <Text style={{fontSize: 16, color: '#000', marginBottom: 15}}>Total: OMR {order_item.total}</Text>
    </View>}

    {order_item && <TouchableOpacity
      style={styles.btn}
      onPress={() =>
        deleteOrder()
      }>
      <Text style={styles.btnText}>Delete</Text>
    </TouchableOpacity>}
    </ScrollView>
  )
}
