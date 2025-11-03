// /screens/Login.js
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
      loading: false
    };
  }

  onSubmit() {
    const email = this.state.email;
    const password = this.state.password;

    if (email === '') {
      this.setState({ error: 'Ingresá tu email.' });
      return;
    }

    if (password === '') {
      this.setState({ error: 'Ingresá tu contraseña.' });
      return;
    }

    this.setState({ loading: true, error: '' });

    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Home');
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

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.link}>Ir al registro</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 16
   },
  title: { fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12 
},
  field: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    borderRadius: 6
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 8
  },
});
