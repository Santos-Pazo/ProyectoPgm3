import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post';
 
class Home extends Component{
    constructor(){
        super()
        this.state ={
           posts: [],
           cargando: true,
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
                    cargando: false
                })
            }
        )
    }
 
   
    render(){
        return(
            this.state.cargando == false ?
            <React.Fragment>
                <View style={styles.bodyArriba}> 
                    <Text >Bienvenidos a Köy </Text>
                </View>
                <View style={styles.bodyAbajo}> 
                    <FlatList 
                     
                    data ={this.state.posts}
                    keyExtractor= {post => post.id}
                    renderItem= {({item})=> <Post data={item}/>}
                    />
                </View>
                   
            </React.Fragment>
                :
            <View><ActivityIndicator/></View>
        )
    }
   
   
}
const styles = StyleSheet.create({
        bodyArriba:{
            flex: 1,
            backgroundColor: '#F02BA0'
        },
        bodyAbajo:{
            flex: 8,
            backgroundColor: '#F0E074'
        }

})
 
export default Home;


