import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
 
class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
           email: '',
           password: '',
           
        }
    }
    submit(){
        console.log(this.state)
    }
 
    render(){
        return(
           <View style={styles.formContainer}>
               <Text style={{color: 'white'}}> Login </Text>
               <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={(text)=> this.setState({email: text})}>
               </TextInput>
               <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text)=> this.setState({password: text})}>
               </TextInput>
               <TouchableOpacity onPress={() => this.props.login(this.state.email, this.state.password)} style={styles.boton}  disabled={this.state.email == '' || this.state.password == '' ? true:false}>
                   <Text style={{color: 'white'}}> Login </Text>
               </TouchableOpacity>
 
               {/* <Text>{this.props.errorCode}</Text> */}
               <Text>{this.props.errorMessage}</Text> 
           </View>
        )
    }
}
 
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        backgroundColor: '#372441',
        flex: 1
    },
    input:{
        height:50,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        backgroundColor: 'white',
        borderRadius: 6,
        marginVertical:10,
    },
    boton:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        textAlign: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#DCB155",
        borderColor: "#fxe59a",
        marginHorizontal: 3
    }
})
 
 
 
export default Login