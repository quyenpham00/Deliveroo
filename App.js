import { URL, URLSearchParams } from 'whatwg-url'
import { Buffer } from 'buffer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RestaurantScreen from './screens/RestaurantScreen'
import { Provider } from 'react-redux'
import { store } from './store'
import BasketScreen from './screens/BasketScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Restaurant' component={RestaurantScreen} />
          <Stack.Screen
            name='Basket'
            component={BasketScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}
