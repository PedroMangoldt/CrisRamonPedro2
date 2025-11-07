import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';

class Posteos extends Component {
    constructor(props){ 
        super(props);
        this.state = {
    
        }
      }
      render() {
        return (
          <View style={styles.card}>
            <Text style={styles.owner}>{this.props.posteo.data.owner}</Text>
            <Text>{this.props.posteo.data.description}</Text>
          </View>
        );
      }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 5
  },

})

export default Posteos;