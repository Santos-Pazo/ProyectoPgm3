import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator, Image, FlatList, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';


class Register extends Component{
    constructor(props){
        super(props)
        this.state ={
           mail: '',
           password: '',
           username: '',
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
                    onChangeText={(text)=> this.setState({username: text})}>
               </TextInput>
               <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text)=> this.setState({password: text})}>
               </TextInput>
               <TouchableOpacity onPress={() => this.props.register(this.state.mail, this.state.password, this.state.username )}  style={styles.boton} 
                disabled={this.state.mail == '' || this.state.username == '' || this.state.password == '' ? true:false}>
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
        backgroundColor:'rgba(131, 43, 247, 0.54)',
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
 
 
 
// redondeo de los bordes: 4
// estilo de borde: solid
// color del borde: #28a745
 
 
 
export default Register






 
 
 
 




 

