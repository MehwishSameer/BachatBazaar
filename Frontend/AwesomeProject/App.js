import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Cart from './components/add-to-cart';
import Main from './components/Main';
import Checkout from './components/Checkout';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import swal from 'sweetalert2';
window.Swal = swal;

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='main' screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="login" component={Login} options={{
    title: 'Login - BachatBazaar',
    headerStyle: {
        backgroundColor: "#1E90FF",
    }}}/>
        <Stack.Screen name="main" component={Main} options={{
    title: 'Home - BachatBazaar',
    headerStyle: {
        backgroundColor: "#1E90FF",
    }}}/>
        <Stack.Screen name="cart" component={Cart} options={{
    title: 'Cart - BachatBazaar',
    headerStyle: {
        backgroundColor: "#1E90FF",
    }}}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{
    title: 'Checkout - BachatBazaar',
    headerStyle: {
        backgroundColor: "#1E90FF",
    }}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
