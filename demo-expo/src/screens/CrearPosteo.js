import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default class CrearPosteo extends Component {
    constructor(props){ 
      super(props);
      this.state = {
  
      }
    }
    render() {
      return (
        <View>
          <Text style={styles.title}>Crear Nuevo Post</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})