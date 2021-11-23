import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home'
import Login from '../screens/login'
import Register from '../screens/register'
import {auth, db} from '../firebase/config'
import Profile from '../screens/profile'
import Posts from '../screens/posts'
import Buscador from '../screens/buscador'
import { getAuth } from "firebase/auth";
 
const Drawer = createDrawerNavigator();

const user = auth.currentUser;
 
class Menu extends Component {
    constructor(props){
        super(props);
        this.state ={
            logueado: false,
            userData: {},
            errorCode:'',
            errorRegistro:'',
            errorLogin: '',
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if (user){
                this.setState({
                    logueado: true,
                    userData: user,
                })
            }
        })
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const uid = user.uid;
          }
        
    }
 
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then((response)=>{
            // console.log(response);
        })
        .catch( e => {
            console.log(e);
            this.setState({
                errorCode: e.code,
                errorRegistro: e.message ,
            })
        })
    }
    
 
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass )
        .then(user => {     
            // console.log(user);
            this.setState({
                userData: user,
                logueado: true
            })
        })
        .catch( error => {
            console.log(error);
            this.setState({
                errorCode: error.code,
                errorLogin: error.message ,
            })
        })
    }
 
    logout(){
        auth.signOut()
        .then( response => {
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
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Register" component={() => <Register register={(email, pass )=> this.register(email, pass)} errorCode={this.state.errorCode} errorMessage={this.state.errorRegistro} />}/>
                        <Drawer.Screen name="Login" component={() => <Login login={(email, pass)=> this.login(email, pass)}  errorCode={this.state.errorCode} errorMessage={this.state.errorLogin} />} />
                    </Drawer.Navigator> 
               </NavigationContainer> :
               <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Home" component={() => <Home/>} />
                        <Drawer.Screen name="Profile" component={() => <Profile logout={()=> this.logout()} userData={this.state.userData} />} />   
                        <Drawer.Screen name="Posts" component={(drawerProps) => <Posts drawerProps={drawerProps} />} />      
                        <Drawer.Screen name="Buscador" component={() => <Buscador/>} />       
                    </Drawer.Navigator>      
               </NavigationContainer>
        )
    }
}
 
export default Menu;
 
