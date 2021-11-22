import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
 
class Profile extends Component{
    constructor(props){
        super(props)
        this.state ={
            posts: [],
        }
    }

    componentDidMount(){
        db.collection('Posts').where("owner","==", "currentUser.email").onSnapshot(
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
           <View>
               <Text>My profile</Text>
               {/* <Text> {auth.currentUser.displayName} </Text> */}
               <Text>Email del usuario: {auth.currentUser.email}</Text>
               <Text>Fecha de creación: {auth.currentUser.metadata.creationTime}</Text>
               <Text>Ultima conexión: {auth.currentUser.metadata.lastSignInTime}</Text>
               <TouchableOpacity onPress={() => this.props.logout()} style={styles.boton}>
                   <Text> Logout</Text>
               </TouchableOpacity>

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
    boton:{
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1
    }
})
 
export default Profile
