import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { FontAwesome } from '@expo/vector-icons';


export default class CameraPage extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const camera = Camera.requestCameraPermissionsAsync();
        const hasCameraPermission = ((await camera).granted );
        this.setState({ hasCameraPermission });
        console.log("oooooooo")
    }

    uploadImage = async (url) => {
        //Check if any file is selected or not
    
          //If file selected then create FormData
          const fileToUpload = url;
          const data = new FormData();
          data.append('name', 'Image Upload');
          data.append('file_attachment', fileToUpload);
          let res = await axios(
            'https://860b-103-162-207-140.in.ngrok.io',
            {
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data; ',
              },
              body: data,

            }
          );
          let responseJson = await res.json();
          if (responseJson.status == 1) {
            alert('Upload Successful');
          }
        
    };

    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          var image=photo.uri
          this.uploadImage(image)
        }
      }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
            {console.log("oooo")}
        } else if (hasCameraPermission === false) {
            console.log("o")
            return  <Text>Access to camera has been denied.</Text>;
        } else {
        return (
            <View style={{flex:1,alignItems:'flex-end'}}>
                {console.log("oooo")}
                <Camera
                    style={styles.preview}
                    ref={ref => {this.camera = ref}}   
                />
                {console.log("oooo")}
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=>this.takePicture()}
                  >
                    {console.log("oooo")}
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                  {console.log("oooo")}
                </TouchableOpacity>
                {console.log("oooo")}
            </View>
        )
        
        }
    }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

let styles =  StyleSheet.create({
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
});

