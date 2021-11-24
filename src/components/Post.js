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

    
    borrar(){
        db.collection('Posts').doc(this.props.data.id).delete()
    }
    
   
 
    render(){
        return(
            <React.Fragment>
                <View >
                    <Text >{this.props.data.data.post} </Text>
                    <Text >{this.props.data.data.owner}</Text>
                </View>
                {auth.currentUser.email == this.props.data.data.owner ? 
                <TouchableOpacity onPress={()=> this.borrar()}> Borrar </TouchableOpacity> :
                null}
            
            </React.Fragment>
        )
    }
}
 
const styles = StyleSheet.create({
    postConteiner:{
        borderBottomWidth: 3,
        borderRightWidth: 3,
        
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: '#13E0F0',
        padding: 30
    },
    postFoto:{

    },
    postDescription:{

    }
})
 
 
 
export default Post