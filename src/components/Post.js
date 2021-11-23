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
            <React.Fragment>
                <View style={styles.postConteiner}>
                    <Text >{this.props.data.data.post} </Text>
                    <Text >{this.props.data.data.owner}</Text>
                </View>
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