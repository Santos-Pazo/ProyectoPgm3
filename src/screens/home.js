import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import Register from './register';
 
 
class Home extends Component{
    constructor(){
        super()
        this.state ={
           
        }
    }
 
   
    render(){
        return(
            <View style={styles.body}>
                <Text>Bienvenidos a Köy </Text>
                <Text>Lpm</Text>
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


