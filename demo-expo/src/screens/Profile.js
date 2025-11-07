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
    db.collection('posts').onSnapshot(docs => {
      let posts = [];

      docs.forEach(doc => {
        const data = doc.data();
        if (data.owner === auth.currentUser.email) {
          posts.push({
            id: doc.id,
            data: data,
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
    return (
      <View style={styles.container}>
        <Text>Mi Perfil</Text>

        <Text>Nombre de usuario: {auth.currentUser.email}</Text>
        <Text>Email: {auth.currentUser.email}</Text>

        <Text>Mis posteos:</Text>

        {this.state.loading ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList
            data={this.state.posteosUsuario}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Posteos posteo={item} />}
          />
        )}

        <Pressable onPress={() => this.logout()}>
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
    padding: 10,
  },
});