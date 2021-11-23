// Tarjeta de cada post

import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config'
 
class Post extends Component{
    constructor(props){
        super(props)
        this.state ={
           
        }
    }

   
 
    render(){
        return(
           <View style={styles.formContainer}>
               <Text>{this.props.data.data.post} </Text>
               <Text>{this.props.data.data.owner}</Text>
           </View>
        )
    }
}
 
const styles = StyleSheet.create({
})
 
 
 
export default Post