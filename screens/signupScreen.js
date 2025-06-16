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

const Signup = () => {
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
          style={styles.logintext}></TextInput>
        <TextInput
          placeholder="Enter your Email"
          style={styles.logintext}></TextInput>
        <TextInput
          placeholder="Enter your University Name"
          style={styles.logintext}></TextInput>
        <TextInput
          placeholder="Enter your Password"
          style={styles.logintext}></TextInput>
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
            <Picker.Item label="Participant" value="Participant"></Picker.Item>
            <Picker.Item label="Organizer" value="Organizer"></Picker.Item>
          </Picker>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 43,
          }}>
          <Text style={styles.redirect_text}>Already have an account?</Text>
          <Text style={styles.redirect_text}>LogIn</Text>
        </View>
        <View style={{marginTop: hp('4%')}}>
          <Primarybtn name="Signup Now"></Primarybtn>
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
