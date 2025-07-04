import {useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import auth from '@react-native-firebase/auth';
import primary_text_color from '../defaults';
import {UserContext} from '../App';

const Qrgen = () => {
  const {userdata, setUserdata} = useContext(UserContext);
  const route = useRoute();
  const {usereventdata} = route.params;
  return (
    <View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Lato-Regular',
            marginBottom: 5,
          }}>
          Your Gateway to the Event!
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Lato-Bold',
            color: primary_text_color,
          }}>
          Scan Me!
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            fontSize: 20,
            color: primary_text_color,
          }}>
          {userdata.username}
        </Text>
        <Text style={{fontFamily: 'Lato-Light', fontSize: 18}}>
          {usereventdata.eventtitle}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          //   borderWidth: 1,
          height: 340,
        }}>
        <QRCode
          value={`${auth().currentUser.uid}_${usereventdata.event_id}`}
          size={260}
          backgroundColor="transparent"></QRCode>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            fontFamily: 'Lato-Regular',
            textAlign: 'center',
          }}>
          📱 Show this QR at entry gate
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 5,
            fontFamily: 'Lato-Regular',
            textAlign: 'center',
            marginLeft: 15,
            marginTop: 5,
          }}>
          Do not share with others
        </Text>
      </View>
    </View>
  );
};
export default Qrgen;
