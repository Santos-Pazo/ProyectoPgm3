import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput, ImageBackground} from 'react-native';
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
        db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    cargando: false
                })
            }
        )
    }
 
   
    render(){
        return(
            <View>
                { this.state.cargando == false ?
                <React.Fragment>
                    <View style={styles.bodyArriba}> 
                        <Text >Bienvenidos a Köy </Text>
                    </View>
                    <View style={styles.bodyAbajo}> 
                        <FlatList 
                        data ={this.state.posts}
                        keyExtractor= {post => post.id}
                        renderItem= {({item})=> <Post postData={item}/>}
                        />
                    </View>
                    
                </React.Fragment>
                    :
                <View><ActivityIndicator/></View> } 
            </View>
        )
    }
   
   
}
const styles = StyleSheet.create({
        bodyArriba:{
            flex: 1,
            backgroundColor: 'rgba(131, 43, 247, 0.30)',
        },
        bodyAbajo:{
            flex: 15,
            backgroundColor: '#372441'
        }

})
 
export default Home;


