import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
 
 
class Home extends Component{
    constructor(){
        super()
        this.state ={
           posts: [],

        }
    }

    componentDidMount(){
        db.collection('Posts').orderBy('createAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    posts: posteos,
                })
            }
        )
    }
 
   
    render(){
        return(
            <View style={styles.body}>
                <Text>Bienvenidos a Köy </Text>
                <FlatList 
                data ={this.state.posts}
                keyExtractor= {post => post.id}
                renderItem= {({item})=> <Text>{item.data.post}</Text>}
                 />
            </View>
        )
    }
   
   
}
const styles = StyleSheet.create({
        body:{
            backgroundColor: '#9DF4F5'
        }
})
 
export default Home;


