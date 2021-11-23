import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
 
class Register extends Component{
    constructor(props){
        super(props)
        this.state ={
           mail: '',
           password: '',
           userName: '',
           disabled: false
        }
    }
       

    
 
    render(){
        return(
           <View style={styles.formContainer}>
               <Text> Register </Text>
               <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={(text)=> this.setState({mail: text})}>
                    
               </TextInput>
               <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='username'
                    onChangeText={(text)=> this.setState({userName: text})}>
               </TextInput>
               <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text)=> this.setState({password: text})}>
               </TextInput>
               <TouchableOpacity onPress={() => this.props.register(this.state.mail, this.state.password )} style={styles.boton} disabled={this.state.disabled}>
                   <Text> Register </Text>
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
        marginTop: 20,
    },
    input:{
        height:50,
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
 
 
 
// redondeo de los bordes: 4
// estilo de borde: solid
// color del borde: #28a745
 
 
 
export default Register






 
 
 
 




 

