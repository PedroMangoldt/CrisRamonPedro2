import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            userName: '',
            registered: false,
            error: ''
        }
    }
    onSubmit(email , pass, userName){
        auth.createUserWithEmailAndPassword(email , pass)
        .then(response => {
            this.setState({registered: true})
            db.collection('users').add({
                email: email,
                userName: userName,
                createdAt: Date.now()
            })
            this.props.navigation.navigate("Login");
        })
        .catch( error => {
            this.setState({error: 'Fallo en el registro.'})
            console.log(error)
          })
          console.log(this.state.email, this.state.password, this.state.userName)
    }
    render(){
        return(
        <View style={styles.container}>
            <Text style = {styles.title}>Formulario de Registro</Text>
            <TextInput style={styles.field} keyboardType='email-address' placeholder='Email' onChangeText={ text => this.setState({email:text}) } value={this.state.email} />
                <TextInput style={styles.field} keyboardType='default' placeholder='User Name' onChangeText={ text => this.setState({userName:text}) } value={this.state.userName}/> 
                <TextInput style={styles.field} keyboardType='default' placeholder='Password' secureTextEntry={true}  onChangeText={ text => this.setState({password:text}) } value={this.state.password}/> 
                <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email , this.state.password, this.state.userName)}>
                    <Text>  Registrarse </Text> 
                </Pressable> 
                <Pressable style={styles.button} onPress={ ()=> this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoClickeable}>Ir a login</Text>
                </Pressable>
        </View>
    )}
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
        borderColor: '#DCDCDC',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
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
})

export default Register;