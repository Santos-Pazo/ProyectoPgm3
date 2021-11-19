import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
 
class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
           email: '',
           password: '',
           username: ''
        }
    }
    submit(){
        console.log(this.state)
    }
 
    render(){
        return(
           <View style={styles.contenedor}>
               <Text> Login </Text>
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
               <TouchableOpacity onPress={() => this.props.login(this.state.email, this.state.password)} style={styles.boton}>
                   <Text> Login </Text>
               </TouchableOpacity>
 
               <Text>{this.props.errorCode}</Text>
               <Text>{this.props.errorMessage}</Text>
               
               
               <View>
                   <Text>
                        {this.state.username}
                   </Text>
                   <Text>
                        {this.state.email}
                   </Text>
                   <Text>
                        {this.state.password}  
                   </Text>
               </View>
 
               
           </View>
        )
    }
}
 
const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        margenSuperior: 20
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        // borderColor: red,
        // border: solid,
        // borderRadius: 6,
        marginVertical: 10,
    },
    boton:{
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignContent: 'center',
        borderWidth: 1
    }
})
 
 
 
// redondeo de los bordes: 4
// estilo de borde: solid
// color del borde: #28a745
 
 
 
export default Login