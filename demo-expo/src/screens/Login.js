import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loggedIn: false,
      loading: false
    };
  }

  onSubmit(email, pass) {

    if (email === '') {
      this.setState({ error: 'Ingresa un mail' });
      return;
    }

    if (pass === '') {
      this.setState({ error: 'Ingresa una contraseña' });
      return;
    }

    this.setState({ loading: true, error: '' });

    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        this.setState({ loggedIn: true, loading: false });
        this.props.navigation.navigate('HomeMenu');
      })
      .catch((error) => {
        this.setState({ loading: false, error: 'No existe el usuario' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de login</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error !== '' ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.link}>Ir al registro</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
   },
  title: { 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12 
},
  field: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,

    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    fontSize: 15,
    width: '100%',
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
