import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import primary_text_color from '../defaults';
import {Picker} from '@react-native-picker/picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Primarybtn from '../components/primarybtn';

const Login = () => {
  const [selected, setSelected] = useState('');
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
          style={styles.logintext}></TextInput>
        <TextInput
          placeholder="Enter your Password"
          style={styles.logintext}></TextInput>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 43,
          }}>
          <Text style={styles.redirect_text}>Don't have an account?</Text>
          <Text style={styles.redirect_text}>Sign up</Text>
        </View>
        <View style={{marginTop: hp('4%')}}>
          <Primarybtn name="Login Now"></Primarybtn>
        </View>
        {/* <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}>
          <Picker.Item label="Participant" value="Participant"></Picker.Item>
          <Picker.Item label="Organizer" value="Organizer"></Picker.Item>
        </Picker> */}
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
