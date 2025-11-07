import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class CrearPosteo extends Component {
    constructor(props){ 
      super(props);
      this.state = {
        description: '',
      }
    }

    agregarPost(){
      if (this.state.description !== ''){
      db.collection('posts').add({
        owner: auth.currentUser.email ,
        description: this.state.description,
        createdAt: Date.now()
      })
      .then(res => {
        this.setState({description: ''})
        this.props.navigation.navigate('HomePage');
      })
    }
    }

    render() {
      return (
        <View>
          <Text style={styles.title}>Crear Nuevo Post</Text>
          <TextInput keyboardType='default' placeholder='Escribe tu post' onChangeText={text => this.setState({description: text})} value={this.state.description}/>
            <Pressable onPress={() => this.agregarPost(this.state.description)}>
              <Text>Publicar Post</Text>
            </Pressable>
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