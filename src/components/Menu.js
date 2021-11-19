import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import Login from '../screens/login'
import Register from '../screens/register'
import {auth} from '../firebase/config'
import Profile from '../screens/profile'
 
const Drawer = createDrawerNavigator();
 
class Menu extends Component {
    constructor(props){
        super(props);
        this.state ={
            logueado: false,
            userData: '',
            errorCode:'',
            errorMessage:''
        }
    }
 
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then((response)=>{
            console.log('ok');
            console.log(response)
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorCode: error.code,
                errorMessage: error.message ,
            })
        })
    }
 
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then( response => {
            console.log('logueado');
            console.log(response);
            this.setState({
                userData: response,
                logueado: true
            })
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorCode: error.code,
                errorMessage: error.message ,
            })
        })
    }
 
    logout(){
        auth.signOut()
        .then( response => {
            console.log('deslogueado');
            this.setState({
                logueado: false
            })
        })
        .catch( error => {
            console.log(error);
        })
    }
 
    render (){
        return(
           
                this.state.logueado == false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Register" component={() => <Register register={(email, pass)=> this.register(email, pass)} errorCode={this.state.errorCode} errorMessage={this.state.errorMessage} />}/>
                    <Drawer.Screen name="Login" component={() => <Login login={(email, pass)=> this.login(email, pass)}  errorCode={this.state.errorCode} errorMessage={this.state.errorMessage} />} />
                </Drawer.Navigator> :
               
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={() => <Home/>} />
                    <Drawer.Screen name="Profile" component={() => <Profile logout={()=> this.logout()} userData={this.state.userData} />} />                
                </Drawer.Navigator>      
        )
    }
}
 
export default Menu;
 
