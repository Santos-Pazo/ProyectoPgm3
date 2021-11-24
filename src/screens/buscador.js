import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config'
import Post from '../components/Post'
import { TouchableHighlight } from 'react-native-gesture-handler';
 
class Buscador extends Component{
    constructor(props){
        super(props)
        this.state ={
           search:'',
           posts: [], 
           
        }
    }

    buscador(){
        db.collection('Posts').where("owner","==", this.state.search).onSnapshot(
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
               
                
                console.log(this.state.posts);
            }
        )
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
               <TouchableOpacity style={styles.boton} onPress={()=> this.buscador()}>
                   <Text> Buscar </Text>
               </TouchableOpacity>

               <React.Fragment>
                    {this.state.posts.length !== "0" ?
                        <FlatList 
                        data ={this.state.posts}
                        keyExtractor= {post => post.id}
                        renderItem= {({item})=><Post data={item} />} /> :
                        <Text>El usuario no existe o todavio no publico </Text>
                
                    }
               </React.Fragment>
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


