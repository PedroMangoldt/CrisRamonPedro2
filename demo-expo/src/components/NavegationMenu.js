import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

class NavegationMenu extends Component {
    redner(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="HomePage" component={ HomePage }/>
                <Tab.Screen name="Comments"component={ Comments }/>
                <Tab.Screen name="Profile"component={ Profile }/>
            </Tab.Navigator>
        )
    }
}

export default NavegationMenu;