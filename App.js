import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Home from './src/Home';
import Login from './src/Login';
import Register from './src/Register';
import ShoppingCart from './src/ShoppingCart';
import Profile from './src/Profile';
import Thankyou from './src/Thankyou';
import Dashboard from './src/Dashboard';
import OrderDetails from './src/OrderDetails';
import NewProduct from './src/NewProduct';
import Welcome from './src/Welcome';
import UpdateProfile from './src/UpdateProfile';
import EditProduct from './src/EditProduct';
import Wishlist from './src/Wishlist';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (<SafeAreaProvider>
      <StatusBar
        backgroundColor="#da9d7c"
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />

          <Stack.Screen options={{headerShown: true, title: 'New Account'}} name="Register" component={Register} />
        </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>);
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#d5d5b7"
      />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} initialParams={{user: user}} />

        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} initialParams={{user: user, cart: cart, setCart: setCart}} />

        <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Dashboard} initialParams={{user: user}} />

        <Stack.Screen options={{title: "New Product", headerTitle: "New Product"}} name="NewProduct" component={NewProduct} initialParams={{ user: user }} />

        <Stack.Screen options={{title: "Edit Product", headerTitle: "Edit Product"}} name="EditProduct" component={EditProduct} initialParams={{ user: user, product: null }} />

        <Stack.Screen options={{title: "Order Details", headerTitle: "Order Details"}} name="OrderDetails" component={OrderDetails} initialParams={{user: user, order_item: null}} />

        <Stack.Screen name="ShoppingCart" component={ShoppingCart} initialParams={{user: user, cart: cart}} />

        <Stack.Screen options={{title: "My Profile", headerTitle: "My Profile"}} name="Profile" component={Profile} initialParams={{user: user}} />

        <Stack.Screen options={{title: "Wishlist", headerTitle: "Wishlist"}} name="Wishlist" component={Wishlist} initialParams={{user: user, cart: cart}} />
        <Stack.Screen options={{title: "Update Profile", headerTitle: "Update Profile"}} name="UpdateProfile" component={UpdateProfile} initialParams={{user: user}} />

        <Stack.Screen options={{ headerShown: false }} name="Thankyou" component={Thankyou} initialParams={{user: user}} />

      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>);
}

export default App;