import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import CrearPosteo from '../screens/CrearPosteo';
import Profile from '../screens/Profile';
import Comments from '../screens/Comments';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="Comments" component={Comments} /> 
        </Stack.Navigator>
    );
}

class NavegationMenu extends Component {
    constructor(props){ 
        super(props);
        this.state = { }
    }

    render(){
        return(
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
                <Tab.Screen name="HomePage" component={HomeStack} options={{ tabBarIcon: () => <Entypo name="home" size={24} color="black" />, headerShown: false}}/>

                <Tab.Screen 
                    name="NewPost" 
                    component={CrearPosteo}
                    options={{
                        tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" />, headerShown: false
                    }}
                />

                <Tab.Screen 
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="black" />, headerShown: false
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default NavegationMenu;
