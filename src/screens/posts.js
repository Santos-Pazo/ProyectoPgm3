import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import Camara from "../components/Camara";
import {auth, db} from '../firebase/config';
import Home from './home';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'


class Posts extends Component{
    constructor(props){
        super(props)
        this.state ={
            post: '',
            foto: '',
            displayCamera: true,
            comentario: '',
            
        }
    }

    submit(){
        db.collection('Posts').add({
            owner: auth.currentUser.displayName,
            ownerEmail: auth.currentUser.email,
            post: this.state.post,
            createdAt: Date.now(),
            picture: this.state.foto
             })
        .then( ()=> {
            this.setState({
                post: '',
                displayCamera: true,

            })
            
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch( e=> console.log(e))
    }
    
    uploadPicture(foto){
        this.setState({
            foto: foto,
            displayCamera: false,
        })
    }
 
    render(){
        return this.state.displayCamera ? (
            <Camara uploadPicture={(foto) => this.uploadPicture (foto)} />
        ) : (
           <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escriba ...'
                    multiline
                    value={this.state.post}
                    onChangeText={(text)=> this.setState({post: text})}>
               </TextInput>
               
               <TouchableOpacity onPress={() => this.submit() }  style={styles.submit}>
                   <Text> Submit </Text>
               </TouchableOpacity>

               
           </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor: '#8E05A3',
        flex: 1
    },
    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        color: 'white'
    },
    submit:{    
        paddingHorizontal: 12,
        paddingVertical: 4,
        textAlign: "center",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#DCB155",
        borderColor: "#fxe59a",

    },
})
 
export default Posts