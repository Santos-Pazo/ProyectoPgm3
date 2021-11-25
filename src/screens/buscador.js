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
            <React.Fragment >
                <View style={styles.formContainer}>
                    <View style={styles.inputConteiner}>
                        <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='Busca poosteos de amigos aca...'
                                onChangeText={(text)=> this.setState({search: text})}>
                        </TextInput>
                    
                        <TouchableOpacity style={styles.button} onPress={()=> this.buscador()}>
                            <Text> Buscar </Text>
                        </TouchableOpacity>
                    </View>
               </View>

               <View style={styles.bodyAbajo}>
                    {this.state.posts.length == "0" ?
                        <Text style={styles.alert}>El usuario no existe o todavio no publico </Text> :
                        <FlatList 
                        
                        data ={this.state.posts}
                        keyExtractor= {post => post.id}
                        renderItem= {({item})=> <Post postData={item} />} />
                
                    }
               </View>
            </React.Fragment>
           
        )
    }
}
 


const styles = StyleSheet.create({
    body:{
        backgroundColor: '#9BD7F7'
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(131, 43, 247, 0.30)'
        
    },
    inputConteiner:{
        width: 50,
        display: 'flex',
        flexDirection:' row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
        marginHorizontal:20,
        backgroundColor: '#DCB155',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1

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
    alert:{
        color: '#D31B12'
    },
    bodyAbajo:{
        flex: 15,
        backgroundColor: '#372441'
    }
    
})
 
 
 
export default Buscador


