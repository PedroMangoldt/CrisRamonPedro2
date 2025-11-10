import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Posteos extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    likear(){
        let posteo = this.props.posteo;
        let email = auth.currentUser.email;

        if(posteo.data.likes.includes(email)){
            db.collection('posts')
              .doc(posteo.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayRemove(email)
              })
        } else {
            db.collection('posts')
              .doc(posteo.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayUnion(email)
              })
        }
    }

    render(){
        return(
            <View style={styles.card}>
                <Text style={styles.owner}>{this.props.posteo.data.owner}</Text>
                <Text>{this.props.posteo.data.description}</Text>
                <Text>Cantidad de likes: {this.props.posteo.data.likes.length}</Text>
                
                <Pressable onPress={() => this.likear()}>
                    <Text style={styles.mg}>Me gusta</Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('Comments', { id: this.props.posteo.id })}>
                    <Text style={styles.commentBtn}>Comentarios</Text>
                </Pressable>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'#fff',
        padding:15,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#ddd',
        marginBottom:15
    },
    owner:{
        fontWeight:'bold',
        marginBottom:5
    },
    mg:{
        marginTop:10,
        color:'blue'
    }
})

export default Posteos;
