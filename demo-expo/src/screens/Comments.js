
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
      postOwner: '',
      postDescription: '',
      postLikes: 0,
    };
  }

  componentDidMount(){
    const id = this.props.route.params.id;

    db.collection('posts')
      .doc(id)
      .onSnapshot(doc => {
        let data = doc.data();

        let arrayComentarios = [];
        if (data.comments){
          arrayComentarios = data.comments;
        }

        let NumeroLikes = 0;
        
        NumeroLikes = data.likes.length;
        

        this.setState({
          comentarios: arrayComentarios,
          postOwner: data.owner,
          postDescription: data.description,
          postLikes: NumeroLikes,
        });
      });
  }

  enviarComentario(){
    const id = this.props.route.params.id;

    if (this.state.comentario !== ''){
      db.collection('posts')
        .doc(id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            text: this.state.comentario,
            createdAt: Date.now()
          })
        })
        .then(() => {
          this.setState({ comentario: '' });
        });
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.postCard}>
          <Text style={styles.owner}>{this.state.postOwner}</Text>
          <Text style={styles.post}>{this.state.postDescription}</Text>
          <Text style={styles.likes}>{this.state.postLikes} likes</Text>
        </View>

        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={this.state.comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            <View style={styles.comment}>
              <Text style={styles.commentOwner}>{item.owner}</Text>
              <Text>{item.text}</Text>
            </View>
          }
        />

        <TextInput
          style={styles.field}
          placeholder="Escribe un comentario..."
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
        />

        <Pressable style={styles.button} onPress={() => this.enviarComentario()}>
          <Text>Publicar comentario</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 12,
    backgroundColor: '#9EC9FF',
  },
  postCard:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  owner:{
    fontWeight: 'bold',
    marginBottom: 6
  },
  post:{
    marginBottom: 6
  },
  likes:{
    fontSize: 12
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  comment:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8
  },
  commentOwner:{
    fontWeight: 'bold',
    marginBottom: 3
  },
  field:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white'
  },
  button:{
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10
  }
});

export default Comments;
