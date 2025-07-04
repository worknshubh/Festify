import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import primary_text_color from '../defaults';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Eventcard from '../components/eventcard';
const Createevent = ({navigation}) => {
  const [organizerevents, setOrganizerevnts] = useState(null);
  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Events')
      .where('organizer', '==', uid)
      .get()
      .then(snapshot => {
        const temp = [];
        snapshot.forEach(doc => {
          temp.push(doc.data());
        });
        setOrganizerevnts(temp);
      });
  }, []);

  function redirecttocreate() {
    navigation.navigate('createScreen');
  }
  function redirecttoeventdata(event_data) {
    navigation.navigate('Eventdata', {event_data});
  }
  return (
    <ScrollView>
      <FlatList
        data={organizerevents}
        renderItem={({item}) => (
          <Eventcard
            details={item}
            eventdata={() => {
              redirecttoeventdata(item);
            }}></Eventcard>
        )}></FlatList>
      <View
        style={{
          position: 'absolute',
          margin: 20,
          top: hp('68%'),
          right: wp('1%'),
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: primary_text_color,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 80,
          }}
          onPress={redirecttocreate}>
          <Image
            source={require('../assets/images/create.png')}
            style={{height: 30, width: 30, tintColor: 'white'}}></Image>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Createevent;
