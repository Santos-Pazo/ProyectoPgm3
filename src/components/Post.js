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
            meGustas: 0,
            myLike: false,
            showModal: false,
            comment: '',
            commentList: null,
            
        }
    }

    componentDidMount(){
        if(this.props.postData.data.meGustas){
           this.setState({
            meGustas:this.props.postData.data.meGustas.length,
            myLike: this.props.postData.data.meGustas.includes(auth.currentUser.email),  
       })
   } 
}
    


    likePost() {
        let posteos = db.collection("Posts").doc(this.props.postData.id);

        posteos.update({
            meGustas: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                meGustas: this.props.postData.data.meGustas.length,
                myLike: true,
            })
            console.log('likeado');
        })
        .catch((error) => {
           console.error("Error: ", error); 
        })
    }

    dislikePost() {
        let post = db.collection("Posts").doc(this.props.postData.id);

        post.update({
            meGustas: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                meGustas: this.props.postData.data.meGustas.length,
                myLike: false,
            })
            console.log('disliked');
        })
        .catch((error) => {
           console.error("Error: ", error);
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
            comments: this.state.comment
        }
        db.collection('Posts').doc(this.props.postData.id).update({
         comment: firebase.firestore.FieldValue.arrayUnion(aComment)
        })
        .then(()=>{
            this.setState({
             comment: '',
             commentList: this.props.postData.data.comment,
            })
        })
     }
     deletePost (){
         db.collection('Posts').doc(this.props.postData.id).delete()
     }

   
 
    render(){
        return(
                <View style={styles.postConteiner}>
                    
                    <Image
                        style={{width: '100%', height: 250, borderRadius: '10px',}}
                        source= {{uri: this.props.postData.data.picture}}
                    />
                    <Text > {this.props.postData.data.owner} </Text>  
                    <Text > {this.props.postData.data.post} </Text> 
                    <Text style={styles.infoText} >Likeado Por {this.state.meGustas}</Text>
                    <View >
                        {this.props.postData.data.owner == auth.currentUser.displayName ?
                            <TouchableOpacity onPress={() => this.deletePost()}  >
                                <Text style={styles.out}>  Borrar </Text>
                            </TouchableOpacity> 
                        : null}
                     </View>
                     <View style={styles.postDescription}>
                        <TouchableOpacity onPress={()=>this.openModal()} >
                            <Text> Comentar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.postDescription}>
                        { this.state.myLike ?
                            <TouchableOpacity onPress={() => this.dislikePost()}>
                                <Text> Quitar like</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={() => this.likePost()}>
                                <Text> Me gusta</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    { ! this.state.showModal ?
                       null
                        :
                            <Modal style={{backgroundColor: '#372441'}}
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
                            value={this.state.comment}
                            onChangeText={texto => this.setState({comment: texto})}
                            
                        />
                        <TouchableOpacity 
                            onPress={()=>{this.saveComment()}} 
                            disabled={this.state.comment == '' ? true:false}>
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
        marginHorizontal: 50,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: 'rgba(214, 184, 233, 0.29)',
        padding: 30
    },
    postFoto:{

    },
    postComment:{

    },
    postDescription:{    
    paddingHorizontal: 12,
    paddingVertical: 4,
    textAlign: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#DCB155",
    borderColor: "#fxe59a"

    },
    infoText:{
        fontSize: 10,
        color: 'white'
        
    },
    out:{
        fontSize: 12,
        color: 'cyan',
        fontStyle: 'underlined'
    }
    
})

 
 
 
export default Post