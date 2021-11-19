 




import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
 
class Profile extends Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
 
    render(){
        return(
           <View>
               <Text>My profile</Text>
               <Text>Email del usuario: {this.props}</Text>
               <Text>Fecha de creación:</Text>
               <Text>Ultima conexión:</Text>
               <TouchableOpacity onPress={() => this.props.logout()} style={styles.boton}>
                   <Text> Logout</Text>
               </TouchableOpacity>
 
 
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


