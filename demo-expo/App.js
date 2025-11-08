import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import NavegationMenu from './src/components/NavegationMenu';
import React, { Component } from 'react';
import { auth } from './src/firebase/config';

const Stack = createNativeStackNavigator();

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true, loading: false });
      } else {
        this.setState({ loggedIn: false, loading: false });
      }
    });
  }
  render(){
  return (
    <NavigationContainer>
     <Stack.Navigator>
      {this.state.loggedIn ? (
        <Stack.Screen name="HomeMenu" component={ NavegationMenu } options={{headerShown: false}}/>
      ) : (
        <React.Fragment>
        <Stack.Screen name="Login" component={ Login } options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={ Register } options={{headerShown: false}}/>
        </React.Fragment>
      )}
     </Stack.Navigator>
   </NavigationContainer>
  );
}
}
export default App;