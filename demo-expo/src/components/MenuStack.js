import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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

export default HomeStack