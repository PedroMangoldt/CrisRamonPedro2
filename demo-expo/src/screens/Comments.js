import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'; 

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
            this.setState({
                comentarios: data.comments ? data.comments : []
            })
        })
    }

    enviarComentario(){
        const postId = this.props.route.params.id;

        if(this.state.comentario !== ''){
            db.collection('posts')
            .doc(postId)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    text: this.state.comentario,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                this.setState({ comentario: '' })
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Comentarios</Text>

                <FlatList 
                    data={this.state.comentarios}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => 
                        <View style={styles.comment}>
                            <Text style={styles.owner}>{item.owner}</Text>
                            <Text>{item.text}</Text>
                        </View>
                    }
                />

                <TextInput 
                    style={styles.field}
                    placeholder="Escribe un comentario..."
                    onChangeText={(text) => this.setState({comentario: text})}
                    value={this.state.comentario}
                />

                <Pressable style={styles.button} onPress={() => this.enviarComentario()}>
                    <Text>Enviar comentario</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12
    },
    comment:{
        backgroundColor:'#fff',
        padding:10,
        marginBottom:10,
        borderRadius:6,
        borderWidth:1,
        borderColor:'#ddd'
    },
    owner:{
        fontWeight:'bold',
        marginBottom:3
    },
    field:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    button:{
        backgroundColor:'#9EC9FF',
        paddingVertical: 12,
        alignItems:'center',
        borderRadius:6,
        marginTop:10
    }
})

export default Comments;
