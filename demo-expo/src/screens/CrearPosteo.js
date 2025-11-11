import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
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
        createdAt: Date.now(),
        likes: []
      })
      .then(res => {
        this.setState({description: ''})
        this.props.navigation.navigate('HomePage');
      })
    }
    }

    render() {
      return (
        <View style={styles.vista}>
        <View style={styles.container}>
          <Text style={styles.title}>Crear Nuevo Post</Text>
          <TextInput style={styles.input} keyboardType='default' placeholder='Escribe tu post' onChangeText={text => this.setState({description: text})} value={this.state.description}/>
            <Pressable style={styles.button} onPress={() => this.agregarPost(this.state.description)}>
              <Text>Publicar Post</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    vista: {
      backgroundColor: '#9EC9FF',
      height: '100%',
      justifyContent: 'center',
    },
    container: { 
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#FFF8EC',
      borderRadius:8,
      borderWidth:3,
      borderColor:"black",
      marginVertical: 7,
      marginHorizontal: 15,
 
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      width: '100%',
    },
    button: {
      backgroundColor: '#D9D9D9',
      paddingVertical: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 6,
      marginTop: 8,
      width: '100%',
    },
})