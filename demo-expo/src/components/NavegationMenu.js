import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import CrearPosteo from '../screens/CrearPosteo';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

class NavegationMenu extends Component {
    constructor(props){ 
        super(props);
        this.state = {
          
        }
      }
    render(){
        return(
            <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
                <Tab.Screen name="HomePage" component={ Home } options={ { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }}/>
                <Tab.Screen name="NewPost" component={ CrearPosteo } options={ { tabBarIcon: () => <FontAwesome5 name="plus-circle" size={24} color="black" /> }}/>
                <Tab.Screen name="Profile"component={ Profile } options={ { tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="black" /> }}/>
            </Tab.Navigator>
        )
    }
}

export default NavegationMenu;