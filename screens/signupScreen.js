import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import primary_text_color from '../defaults';
import {Picker} from '@react-native-picker/picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Primarybtn from '../components/primarybtn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Signup = ({navigation}) => {
  const [selected, setSelected] = useState('');
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');
  const [userinstitute, setUserinstitute] = useState('');

  function redirecttonextscreen() {
    auth()
      .createUserWithEmailAndPassword(useremail, userpass)
      .then(user => {
        firestore().collection('users').doc(user.user.uid).set({
          username: username,
          useremail: useremail,
          userinstitute: userinstitute,
          role: selected,
          uid: auth().currentUser.uid,
          events_applied: [],
          profile_pic: '',
        });
      })
      .then(navigation.replace('LoginScreen'))
      .catch(error => {
        console.log('Signup error:', error);
        alert(error.message);
      });
  }

  function redirecttologin() {
    navigation.replace('LoginScreen');
  }
  return (
    <SafeAreaView>
      <View style={styles.logobox}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoimage}></Image>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <View style={{position: 'relative', top: -60}}>
          <Text
            style={{
              fontSize: 30,
              width: wp('29%'),
              color: primary_text_color,
              fontFamily: 'Lato-Regular',
            }}>
            Start fresh. Start planning.
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', position: 'relative', top: -140}}>
          <Text
            style={{
              fontSize: 30,
              width: wp('30%'),
              color: primary_text_color,
              fontFamily: 'Lato-Light',
            }}>
            Sign up, show up, glow up
          </Text>
        </View>
      </View>
      <View style={styles.loginarea}>
        <TextInput
          placeholder="Enter your Name"
          style={styles.logintext}
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}></TextInput>
        <TextInput
          placeholder="Enter your Email"
          style={styles.logintext}
          value={useremail}
          onChangeText={text => {
            setUseremail(text);
          }}></TextInput>
        <TextInput
          placeholder="Enter your Password"
          style={styles.logintext}
          value={userpass}
          onChangeText={text => {
            setUserpass(text);
          }}></TextInput>
        <View
          style={{
            marginHorizontal: 40,
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
          }}>
          <Picker
            selectedValue={userinstitute}
            onValueChange={value => {
              setUserinstitute(value);
            }}>
            <Picker.Item label="Select University" value=""></Picker.Item>
            <Picker.Item
              label="Institute of Engineering and Management"
              value="Institute of Engineering and Management"></Picker.Item>
            <Picker.Item
              label="Techno India University"
              value="Techno India University"></Picker.Item>
            <Picker.Item
              label="Brainware University"
              value="Brainware University"></Picker.Item>
          </Picker>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginHorizontal: 40,
            marginVertical: 5,
          }}>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => setSelected(itemValue)}
            style={{}}>
            <Picker.Item label="Select role" value=""></Picker.Item>
            <Picker.Item label="Participant" value="Participant"></Picker.Item>
            <Picker.Item label="Organizer" value="Organizer"></Picker.Item>
          </Picker>
        </View>
        <TouchableOpacity onPress={redirecttologin}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 43,
            }}>
            <Text style={styles.redirect_text}>Already have an account?</Text>
            <Text style={styles.redirect_text}>LogIn</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: hp('4%')}}>
          <Primarybtn
            name="Signup Now"
            redirect={redirecttonextscreen}></Primarybtn>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          //   borderWidth: 3,
          position: 'relative',
          top: -120,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 28,
              width: wp('32%'),
              color: primary_text_color,
              fontFamily: 'Lato-Regular',
            }}>
            Start organizing like a pro.
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: 28,
              width: wp('30%'),
              color: primary_text_color,
              textAlign: 'right',
              fontFamily: 'Lato-Regular',
            }}>
            Create your account. Create the vibe
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logobox: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  logoimage: {
    height: 130,
    width: 130,
    // borderWidth: 1,
  },
  loginarea: {
    // borderWidth: 2,
    position: 'relative',
    top: -140,
  },
  logintext: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginHorizontal: 40,
    marginBottom: 20,
    borderColor: primary_text_color,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  redirect_text: {
    marginLeft: 4,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
});

export default Signup;
