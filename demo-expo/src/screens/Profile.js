import React, { Component } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteos from '../components/Posteos';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      posteosUsuario: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(docs => {
      docs.forEach(doc => {
        this.setState({
          username: doc.data().userName
        })
      })
    })
    db.collection('posts').onSnapshot(docs => {
      let posts = [];

      docs.forEach(doc => {
        const data = doc.data();
        if (data.owner === auth.currentUser.email) {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        }
      });

      this.setState({
        posteosUsuario: posts,
        loading: false,
      });
    });
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  render() {
    console.log(this.props);
    
    return (
      <View style={styles.container}>

        <Text style={styles.name}>{this.state.username}</Text>
        <Text>{auth.currentUser.email}</Text>

        <Text style={styles.sectionTitle}>Ultimos posteos</Text>

        {this.state.loading ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList
            data={this.state.posteosUsuario}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Posteos posteo={item} navigation={this.props.navigation}/>}></FlatList>
        )}

        <Pressable style={styles.button} onPress={() => this.logout()}>
          <Text>Cerrar sesión</Text>
        </Pressable>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 18,
  },
  sectionTitle: {
   fontSize: 22,
   fontWeight: '700',
   marginBottom: 12,
   color: '#111',
   paddingTop: 20,
  },
  button: {
    backgroundColor: '#9EC9FF',
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 8,
    width: '100%',
  },

});