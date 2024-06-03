import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {styles} from './Styles';

export default function Dashboard({route, navigation}) {
  const [tab, setTab] = useState('orders');
  const [data, setData] = useState(null);
  const [updated, setUpdate] = useState(Date.now());
  
  useEffect(() => {
    loadContent();
  }, [tab, updated, route.params.update]);

  const loadContent = () => {
    if (tab == 'orders') {
      firestore()
        .collection('orders')
        .orderBy('date', 'desc')
        .get()
        .then(docs => {
          let tmp = [];
          docs.forEach(snapshot => {
            tmp.push({
              id: snapshot.id,
              date: snapshot.data().date,
              timestamp: new Date(snapshot.data().date),
              total: snapshot.data().total,
              payment: snapshot.data().payment,
              items: snapshot.data().items,
              user_id: snapshot.data().user_id,
            });
          });
          setData(tmp);
        })
        .catch(() => {
          //
        });
    } else {
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
          setData(tmp);
        })
        .catch(() => {
          //
        });
    }
  };

  const handleDelete = item => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
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
              .collection('products')
              .doc(item)
              .delete()
              .then(() => {
                setUpdate(Date.now());
              })
              .catch(() => {
                Alert.alert(
                  'Sorry error while deleting the product try again.',
                );
              });
          },
        },
      ],
    );
  };

  const deleteOrder = item => {
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
              .doc(item)
              .delete()
              .then(() => {
                setUpdate(Date.now());
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

  const Order = ({order_item}) => {
    return (
      <View
        style={{
          ...styles.card,
          ...{width: '90%', padding: 15, alignSelf: 'center'},
        }}>
        <Text style={{ color: '#013236' }}>{order_item.date}</Text>
        <View style={styles.line}></View>
        <Text style={{fontSize: 16, color: '#000', marginBottom: 15}}>
          Total: OMR {order_item.total}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('OrderDetails', {order_item: order_item})
            }>
            <Text style={styles.btnText}>Order Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              deleteOrder(order_item.id)
            }>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        //
      });
  };

  const Product = ({product_item}) => {
    return (
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
        <Text style={styles.productPrice}>OMR {product_item.price}</Text>
        <View style={styles.inline}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("EditProduct", { product: product_item.id })}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleDelete(product_item.id)}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
      {tab === 'products' && <TouchableOpacity
        onPress={() => navigation.navigate('NewProduct')}
        style={{
          zIndex: 1,
          position: 'absolute',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          bottom: 150,
          right: 30,
          backgroundColor: '#013236',
          padding: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>New</Text>
      </TouchableOpacity>}

        <View style={{...styles.inline, ...{justifyContent: "space-between"}}}>
            <Text
                style={{
                fontSize: 20,
                color: '#013236',
                fontWeight: 'bold',
                padding: 5,
                margin: 2
                }}>
                Dashboard
            </Text>
            <TouchableOpacity style={{...styles.btn, ...{padding: 3, margin: 2}}} onPress={handleLogout}>
                <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
        </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#013236',
          marginTop: 15,
        }}>
        <TouchableOpacity
          onPress={() => setTab('orders')}
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            padding: 15,
            backgroundColor: tab === 'orders' ? '#fff' : '#013236',
            borderWidth: 1,
            borderColor: tab === 'products' ? '#fff' : '#013236',
          }}>
          <Text style={{color: tab === 'products' ? '#fff' : '#013236'}}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('products')}
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            padding: 15,
            backgroundColor: tab === 'products' ? '#fff' : '#013236',
            borderWidth: 1,
            borderColor: tab === 'products' ? '#013236' : '#fff',
          }}>
          <Text style={{color: tab === 'products' ? '#013236' : '#fff'}}>
            Products
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{height: '73%'}}>
        <FlatList
          data={data}
          renderItem={({item}) =>
            tab == 'orders' ? (
              <Order key={item.id} order_item={item} />
            ) : (
              <Product key={item.id} product_item={item} />
            )
          }
          keyExtractor={item => item.id}
        />
      </View>
    </ImageBackground>
  );
}
