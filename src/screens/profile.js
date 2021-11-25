import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput, Modal, Alert} from 'react-native';
import {StyleSheet} from 'react-native';
import {auth, db} from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state ={
            posts: [],
            deletePost: '',
            mostrar: false
        }
    }
    
    
    componentDidMount(){
        db.collection('Posts')
        .where("owner","==", auth.currentUser.email)
        .onSnapshot(
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

    mostrarInfo(){
        this.setState({
            mostrar: true
        })
    }
    cerrarInfo(){
        this.setState({
            mostrar: false
        })
    }
    
    render(){
        return(
            <React.Fragment >
                <View style={styles.bodyArriba}>
                    <View stayle={styles.botonConteiner}>                    
                        <TouchableOpacity onPress={() => this.props.logout()} style={styles.boton}>
                            <Text> Logout</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.bienvenido} >Bienvenido a tu perfil {auth.currentUser.displayName} </Text>
                    <View style={styles.modalConteiner}>
                        
                            
                                
                                <Text>Email del usuario: {auth.currentUser.email}</Text>
                                <Text>Fecha de creación: {auth.currentUser.metadata.creationTime}</Text>
                                <Text>Ultima conexión: {auth.currentUser.metadata.lastSignInTime}</Text>    
                                <Text>Cantidad de posts: {this.state.posts.length} </Text>
                                <TouchableOpacity onPress={()=> this.cerrarInfo()} >
                                    <Text style={styles.button}> Cerrar </Text> 
                                </TouchableOpacity>
                           
                        <TouchableOpacity onPress={()=> this.mostrarInfo()}>
                            <Text style={styles.button}>Mostrar Info</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
                <View  style={styles.bodyAbajo}>
                    <FlatList 
                           
                            data ={this.state.posts}
                            keyExtractor= {post => post.id}
                            renderItem= {({item})=> <Post data={item} />}
                        />
                </View>
           </React.Fragment>
        )
    }
}
 
const styles = StyleSheet.create({
   
    boton:{
        backgroundColor: 'red',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1,
        marginRight: 300,
        justifyContent: 'center'
    },
    button:{
        backgroundColor: '#E0BB6A',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1,
        marginRight: 300,
        justifyContent: 'center'
    },
    bodyAbajo:{
        flex: 10,
        backgroundColor: '#372441'
    },
    bodyArriba:{
        flexWrap:'wrap',
        flex: 4,
        backgroundColor: 'rgba(131, 43, 247, 0.30)',
        flexDirection:'column'
    },
    botonConteiner:{
        flexWrap:'wrap',
        margin: 5
    },
    modalConteiner:{
        marginTop: 10,
        
    },
    bienvenido:{
        marginTop: 10,
    }
})
 
export default Profile
