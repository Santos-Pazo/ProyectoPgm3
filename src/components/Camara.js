import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import { storage } from "../firebase/config";
import { Camera } from "expo-camera";

 class Camara extends Component {
    constructor(props){
        super(props);
        this.state= {
            permission: false,
            photo: "",
        };
        this.camera;
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                permission: true,
            });
        })
        .catch((err) => console.log(err));
        Camera.getAvailableCameraTypesAsync().then((res) => console.log(res));
    }

    useCamera() {
        this.camera
        .takePictureAsync()
        .then((photo) => {
            this.setState({
                photo: photo.uri,
            });
        })
    }

    savePicture() {
        fetch(this.state.photo)
        .then((res) => res.blob())
        .then((image) => {
            const ref = storage.ref(`photo/${Date.now()}.jpg`);

            ref.put(image).then(() => {
                ref.getDownloadURL(). then ((url) => {
                    this.props.uploadPicture(url);
                    this.setState({
                        photo: "",
                    });
                });
            });

        })
    }
    deletePicture(){
        this.setState({
            photo: '',
        })
    }

    render() {
        return (<React.Fragment>
            {
                this.state.permission ?
                    this.state.photo ?
                    <React.Fragment>
                        <Image 
                            style={styles.preview}
                            source={ {uri:this.state.photo} }
                        />
                        <View >
                            <TouchableOpacity style={styles.buttonBlue} onPress={()=>this.savePicture()}>
                                <Text> Aceptar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonGrey} onPress={()=>this.deletePicture()}>
                                <Text> Rechazar </Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Camera 
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={ reference => this.camera = reference}
                        />
                        <TouchableOpacity 
                            style={styles.buttonBlue1}
                            onPress={()=>this.useCamera()}>
                            <Text style={styles.big}>Sacar Foto</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                :
                <Text style={styles.big}>No hay permisos para usar la cámara.</Text>
            }
        </React.Fragment>
        );
        
    }
}
const styles = StyleSheet.create({
    cameraBody:{
        flex:7
    },
   
    buttonGrey: {
        flex: 1,
        backgroundColor: "grey",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 20,
        fontFamily: "arial",
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonBlue: {
        flex: 1,
        backgroundColor: "blue",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 20,
        fontFamily: "arial",
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonBlue1: {
        flex: 0.5,
        backgroundColor: "blue",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 20,
        fontFamily: "arial",
        textAlign: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },

    preview:{
        flex:7
    },
    actionArea:{
        flex: 2,
    },
    big:{
        textAlign:"center",
        fontSize: 20,
    }

})

export default Camara;
