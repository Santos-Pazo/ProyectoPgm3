import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config'
 
class Buscador extends Component{
    constructor(props){
        super(props)
        this.state ={
           search:''
        }
    }

    buscador(){
        db
    }
 
    render(){
        return(
           <View style={styles.formContainer}>
               <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Busca amigos aca...'
                    onChangeText={(text)=> this.setState({search: text})}>
               </TextInput>
               <TouchableOpacity style={styles.boton}>
                   <Text> Buscar </Text>
               </TouchableOpacity>
           </View>
        )
    }
}
 
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height: 50,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    boton:{
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1
    }
})
 
 
 
export default Buscador