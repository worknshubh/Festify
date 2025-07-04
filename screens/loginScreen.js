import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import primary_text_color from '../defaults';
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Primarybtn from '../components/primarybtn';
import {UserContext} from '../App';
const Login = ({navigation}) => {
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');
  const {userdata, setUserdata} = useContext(UserContext);
  useEffect(() => {
    if (auth().currentUser) {
      navigation.replace('DrawerMenu');
    }
  }, []);

  function redirecttosignup() {
    navigation.replace('SignupScreen');
  }
  function redirecttoscreen() {
    auth()
      .signInWithEmailAndPassword(useremail, userpass)
      .then(() => {
        const uid = auth().currentUser.uid;
        firestore()
          .collection('users')
          .where('uid', '==', uid)
          .get()
          .then(snapshot => {
            if (!snapshot.empty) {
              setUserdata(snapshot.docs[0].data());
            }
          });
        navigation.replace('DrawerMenu');
      })
      .catch(() => {
        Alert.alert('No user found');
      });
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
            Your events await. Log in to jump in!
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', position: 'relative', top: -140}}>
          <Text
            style={{
              fontSize: 40,
              width: wp('30%'),
              color: primary_text_color,
              fontFamily: 'Lato-Light',
            }}>
            Back in action? Let’s go!
          </Text>
        </View>
      </View>
      <View style={styles.loginarea}>
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
        <TouchableOpacity onPress={redirecttosignup}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 43,
            }}>
            <Text style={styles.redirect_text}>Don't have an account?</Text>
            <Text style={styles.redirect_text}>Sign up</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: hp('4%')}}>
          <Primarybtn name="Login Now" redirect={redirecttoscreen}></Primarybtn>
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
              fontSize: 27,
              width: wp('28%'),
              color: primary_text_color,
              fontFamily: 'Lato-Regular',
            }}>
            Reunited with your plans
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: 32,
              width: wp('30%'),
              color: primary_text_color,
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
            }}>
            Time to make some noise again!
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

export default Login;
