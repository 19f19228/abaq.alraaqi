import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Styles'
import RadioButton from './RadioButton'
import firestore from '@react-native-firebase/firestore';

export default function ShoppingCart({ route, navigation }) {
    const [total, setTotal] = useState(0)
    const [updated, setUpdate] = useState(Date.now())
    const [payment, setPayment] = useState("cod")
    const [cart, setCart] = useState(route.params.cart) 
    const {user} = route.params;

    useEffect(() => {
        let tmp_total = 0
        cart.map(p => {
            tmp_total = tmp_total + (p.price * p.qty)
        })

        setTotal(tmp_total)
    }, [updated])
    
    const handleQty = (product, op) => {
        let tmp = cart
        const index = tmp.findIndex(p => p.id == product.id)
        if(tmp[index]){
            if(op == 'add'){
                tmp[index].qty = tmp[index].qty + 1
            } else {
                let qty = tmp[index].qty - 1
                if(qty === 0){
                    tmp.splice(index, 1)
                } else {
                    tmp[index].qty = qty
                }
            }
    
            setCart(tmp)
            setUpdate(Date.now())
        }
    }

    const handleCheckOut = () => {
        if(cart && cart.length !== 0){
            firestore()
                .collection('orders')
                .add({
                    user_id: route.params.user.uid,
                    items: cart,
                    date: new Date().toDateString(),
                    payment: payment,
                    total: total
                })
                .then(() => {
                    navigation.navigate("Thankyou")
                });

        }
    }

  return (<ScrollView>
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.bg}>
    {cart && cart.length !== 0 &&
    <View style={styles.content}>
        {cart && cart.map(item => <View key={item.id} style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.title}</Text>
            <Text style={{padding: 5, width: '25%', color: '#000'}}>OMR {item.price}</Text>
            <View style={{flexDirection: 'row', width: '25%'}}>
                <TouchableOpacity style={styles.cartBtn} onPress={() => handleQty(item, 'add')}>
                    <Text style={{color: '#fff', textAlign: "center"}}>+</Text>
                </TouchableOpacity>
                <Text style={{color: '#000', padding: 3, backgroundColor: '#fff'}}>{ item.qty }</Text>
                <TouchableOpacity style={styles.cartBtn} onPress={() => handleQty(item, 'min')}>
                    <Text style={{color: '#fff', textAlign: "center"}}>-</Text>
                </TouchableOpacity>
            </View>
        </View>)}
        <Text style={{fontSize: 20, color: '#000', marginBottom: 15}}>Total: OMR {total}</Text>
        <View style={styles.line}></View>
        <View>
            <Text style={{fontSize: 18, color: "#000", marginBottom: 15}}>Payment Method:</Text>
            <RadioButton selected={payment == 'cod'} setSelected={() => setPayment('cod')} label="Cash on delivery" />
            <RadioButton selected={payment == 'bank'} setSelected={() => setPayment('bank')} label="Bank Transfer" />
        </View>
        <View style={styles.line}></View>
        <TouchableOpacity style={styles.btn} onPress={handleCheckOut}>
            <Text style={styles.btnText}>Checkout</Text>
        </TouchableOpacity>
    </View>}


    {(!cart || cart.length == 0) && <View style={styles.content}>
            <Image source={require('./assets/abglogo500.png')} style={styles.logo} />
            <Text style={styles.title}>Looks like you shopping cart is empty!</Text>
            <Text style={styles.title}>Add more products and check back again!</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.btnText}>
                Home
            </Text>
            </TouchableOpacity>
    </View>}
    </ImageBackground>
</ScrollView>)
}
