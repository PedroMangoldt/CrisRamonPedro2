import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

class Posteos extends Component {
    constructor(props){
        super(props);
        this.state = {
            likeado: false
        };
    }

    likear(){
        let posteo = this.props.posteo;
        let email = auth.currentUser.email;

        if(posteo.data.likes.includes(email)){
            db.collection('posts')
              .doc(posteo.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayRemove(email), 
              })
                .then(
                ()=>{
                    this.setState({
                        likeado: false
                    })
                }
            )
            
        } else {
            db.collection('posts')
              .doc(posteo.id)
              .update({
                likes: firebase.firestore.FieldValue.arrayUnion(email)
              })
                .then(
                ()=>{
                    this.setState({
                        likeado: true
                    })
                }
            )
        }
    }

    render(){
        return(
            <View style={styles.card}>
                <Text style={styles.owner}>{this.props.posteo.data.owner}</Text>
                <Text>{this.props.posteo.data.description}</Text>
                <View style={styles.fila}>
                  <Pressable onPress={() => this.likear()}>
                    <Text style={styles.mg}></Text> {this.state.likeado ?
                            <FontAwesome name="heart" size={18} color="black" /> :
                    <Text style={styles.mg}><Feather name="heart" size={18} color="black" /><Text style={styles.textoLike}> {this.props.posteo.data.likes.length} Like</Text></Text>}
                  </Pressable>
                   <Pressable style={styles.commentBtn} onPress={() => this.props.navigation.navigate('HomePage',{screen:'Comments', params:{ id: this.props.posteo.id }})}>
                    <Text>Comentar</Text>
                  </Pressable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
       backgroundColor:'#FFF8EC',
       padding:15,
       borderRadius:8,
       borderWidth:3,
       borderColor:"black",
       marginVertical: 7,
       marginHorizontal: 15,
        
    },
    owner:{
        fontWeight:'bold',
        marginBottom:5
    },
    mg:{
        marginTop:10,
        color:'blue'
    },
    commentBtn:{
        borderColor: 'black',
        backgroundColor: '#D9D9D9',
        
    },
    fila: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    textoLike: {
        color: 'black'
    }
})

export default Posteos;
