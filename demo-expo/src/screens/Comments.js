import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comentario: '',
            comentarios: [],
        }
    }
    
    componentDidMount(){
        const postId = this.props.route.params.id;

        db.collection('posts')
        .doc(postId)
        .onSnapshot(doc => {
            let data = doc.data();
            let arrayComentarios = [];
            if(data.comments){
                arrayComentarios = data.comments;
            } else {
                arrayComentarios = [];
            }

            this.setState({
                comentarios: arrayComentarios
            })
        })
    }


    render(){
        return(
            <View >
                <Text>Comentarios</Text>
            </View>
        )
    }
}

export default Comments;
