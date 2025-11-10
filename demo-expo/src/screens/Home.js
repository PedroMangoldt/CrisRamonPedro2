import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      docs =>{
        let posts = [];
        docs.forEach(doc => {
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
    )
  }

  render() {
    return (
      <View style={styles.flatlist}>

        <Image 
          style={styles.logo}
          source={require('../../assets/logogym.png')} 
          resizeMode='contain'
        />

        {this.state.loading ?
          <Text>Cargando...</Text> :
          <FlatList 
            data={this.state.posteos}
            keyExtractor={ item => item.id }
            renderItem={({item}) => 
              <Posteos posteo={item} navigation={this.props.navigation}/>
            }
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    flex: 1,
    backgroundColor: '#9EC9FF'
  },

  logo:{
    height: 100,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%'
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
    paddingTop: 10,
    textAlign: "center"
  },
})

export default Home;
