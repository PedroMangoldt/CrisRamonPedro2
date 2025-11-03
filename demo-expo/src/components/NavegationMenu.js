import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

class NavegationMenu extends Component {
    redner(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Login"/>
                <Tab.Screen name="Register"/>
            </Tab.Navigator>
        )
    }
}

export default NavegationMenu;