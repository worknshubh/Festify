import React, {useContext, useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {UserContext} from '../App';
import primary_text_color from '../defaults';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
const Profilescreen = () => {
  const {userdata, setUserdata} = useContext(UserContext);
  const [userpic, setUserpic] = useState(
    require('../assets/images/userprofile.png'),
  );
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(userdata.uid)
      .get()
      .then(data => {
        console.log('user pic : ' + data.data().profile_pic);
        if (data.data().profile_pic != '') {
          setUserpic({uri: data.data().profile_pic});
        }
      });
  }, []);
  function setprofile() {
    launchImageLibrary(
      {mediaType: 'photo', maxHeight: 500, maxWidth: 500},
      data => {
        const pic = data.assets[0].uri;
        const cloudnaryUpload = pic => {
          const data = new FormData();
          data.append('file', {
            uri: pic,
            type: 'image/jpeg',
            name: 'upload.jpg',
          });
          data.append('upload_preset', 'festify_users');
          data.append('cloud_name', 'drjbxyfr6');
          fetch('https://api.cloudinary.com/v1_1/drjbxyfr6/upload', {
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: data,
          })
            .then(res => res.json())
            .then(output => {
              console.log(output);
              firestore().collection('users').doc(userdata.uid).update({
                profile_pic: output.secure_url,
              });
              setUserpic({uri: output.secure_url});
            });
        };
        cloudnaryUpload(pic);
      },
    );
  }
  return (
    <View>
      <View style={styles.image_box}>
        <TouchableOpacity onPress={setprofile}>
          <Image source={userpic} style={styles.profile_img}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.textarea}>
        <Text style={{fontSize: 24}}>Name</Text>
        <Text
          style={{fontSize: 18, marginBottom: 20, color: primary_text_color}}>
          {userdata.username}
        </Text>
        <Text style={{fontSize: 24}}>Role</Text>
        <Text
          style={{fontSize: 18, marginBottom: 20, color: primary_text_color}}>
          {userdata.role}
        </Text>
        <Text style={{fontSize: 24}}>Email</Text>
        <Text
          style={{fontSize: 18, marginBottom: 20, color: primary_text_color}}>
          {userdata.useremail}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profile_img: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
  image_box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textarea: {
    margin: 20,
  },
});
export default Profilescreen;
