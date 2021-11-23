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
        return (
            <>
                {this.state.photo ? (
                    <>
                        <Image
                            style={{ flex: 1, width: "100%" }}
                            source={{ uri: this.state.photo }}
                        />
                        <View>
                            <TouchableOpacity  onPress={() => this.savePicture()}>
                                <Text>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={() => this.deletePicture()}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                   
                    <View style={{ flex: 1 ,width: "100%" }}>
                        
                        <Camera
                            type={Camera.Constants.Type.front}
                            style={{ flex: 1 ,width: "100%" }}
                            ref={(cam) => (this.camera = cam)}
                        />
                        <TouchableOpacity  onPress={() => this.useCamera()}>
                            <Text>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                    
                )}
            </>
        );
        
    }
}

export default Camara;
