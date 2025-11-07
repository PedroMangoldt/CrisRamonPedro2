import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import Posteos from '../components/Posteos';


 class Home extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      posteos: [],
      loading: true,
    }
  }

  componentDidMount(){
  db.collection('posts').onSnapshot(
    docs =>{
      let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
          this.setState({
            posteos: posts,
            loading: false,
          })
        
    }
  )}

  render() {
    return (
      <View>
        {this.state.loading ?
        <Text>Cargando...</Text> :
        <FlatList data={this.state.posteos} keyExtractor={ item => item.id} renderItem={({item}) => <Posteos posteo={item}/>}></FlatList>}
      </View>
    );
  }
}
export default Home;
