// Tarjeta de cada post

import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, Modal, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config'
import firebase from 'firebase';
 
class Post extends Component{
    constructor(props){
        super(props)
        this.state ={
            meGusta: 0,
            gustado: false,
            showModal: false,
            comment: '',
            commentList: null
        }
    }

    componentDidMount(){

        if(this. props.postData.data.meGusta){
           this.setState({
            meGusta:this.props.postData.data.meGusta.length,
            gustado: this.props.postData.data.meGusta.includes(auth.currentUser.email),  
       })
   } 
}
    


    likePost() {
        let post = db.collection("Posts").doc(this.props.postData.id);

        post.update({
            meGusta: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                meGusta: this.state.meGusta +1,
                gustado: true,
            })
            console.log('liked');
        })
        .catch((error) => {
           console.error("Error subiendo el archivo: ", error); 
        })
    }

    dislikePost() {
        let post = db.collection("Posts").doc(this.props.postData.id);

        post.update({
            meGusta: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                meGusta: this.state.meGusta - 1,
                gustado: false,
            })
            console.log('disliked');
        })
        .catch((error) => {
           console.error("Filing error: ", error);
       });
    }

    openModal() {
        this.setState({
            showModal: true,
        })
    }

    closeModal() {
        this.setState({
            showModal: false,
        })
    }

    saveComment(){
       console.log ('Save Comment')
       let aComment ={
           createdAt: Date.now (),
           autor: auth.currentUser.displayName,
           comments: this.state.comments
       }
       db.collection('Posts').doc(this.props.postData.id).update({
        comment: firebase.firestore.FieldValue.arrayUnion(aComment)
       })
       .then(()=>{
           this.setState({
            comments: '',
           })
       })
    }
    deletePost (){
        db.collection('Posts').doc(this.props.postData.id).delete()
    }

   
 
    render(){
        return(
                 <View >
             <Text > {this.props.postData.data.owner} </Text>  
             <Text >El posteo fue creado el: 
                {this.props.postData.data.createdAt}</Text> 
            <Text > {this.props.postData.data.post} </Text> 
           
                <Image
                    style={{width: '100%', height: 250, borderRadius: '10px',}}
                    source= {{uri: this.props.postData.data.picture}}
                />
                <Text>{this.props.postData.data.username}</Text>
                <Text >{this.props.postData.data.estado}</Text>
                <TouchableOpacity onPress={() => this.openModal()}>
                    <Text >{this.state.likes} Like</Text>
                </TouchableOpacity>

                <View>

                {this.props.postData.data.owner == auth.currentUser.displayName ?
               <TouchableOpacity onPress={() => this.deletePost()}  >
               <Text >  
                   
               </Text>
           </TouchableOpacity> 
            : null}

            <TouchableOpacity onPress={()=>this.openModal()}>
                <Text>
                
                </Text>
            </TouchableOpacity>
                {
                    ! this.state.liked ?
                        <TouchableOpacity 
                        onPress={() => this.likePost()}>
                            <Text > 
                                
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  
                        onPress={() => this.dislikePost()}>
                            <Text> 
                               
                            </Text>
                        </TouchableOpacity>
                }
                </View>

                { ! this.state.showModal ?
                       null
                        :
                            <Modal
                                visible={this.state.showModal}
                                animationType="slide"
                                transparent={false}
                                >

                                    <TouchableOpacity onPress= {() => this.closeModal()}>
                                        <Text>X</Text>
                                    </TouchableOpacity>
                                    
                                
                                    {
                                this.state.commentList ?
                                
                                <FlatList
                                data={this.state.commentList}
                                keyExtractor={(comments) => comments.createdAt.toString ()}
                                renderItem={ ({item})=> <Text> {item.autor}: {item.comments}</Text> }
                                /> :
                                <Text>No Comments</Text>
                            }



                    <View>
                        <TextInput 
                            placeholder="Comentar"
                            keyboardType="default"
                            multiline
                            value={this.state.comments}
                            onChangeText={texto => this.setState({comments: texto})}
                            
                        />
                        <TouchableOpacity 
                            onPress={()=>{this.saveComment()}} 
                            disabled={this.state.comments == '' ? true:false}>
                            <Text >Save Comment</Text>
                        </TouchableOpacity>
                    </View>
                            </Modal>
                           
                }
                
            </View>
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
    postComment:{

    },
    postDescription:{
    backgroundColor: "#fxe59a",
    backgroundColor: "#fxe59a",
    paddingHorizontal: 12,
    paddingVertical: 4,
    textAlign: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fxe59a",
    borderColor: "#fxe59a"

    }
})

 
 
 
export default Post