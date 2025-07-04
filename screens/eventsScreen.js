import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import Eventcard from '../components/eventcard';
const Events = ({navigation}) => {
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

  function scanparticipant(event_data) {
    navigation.navigate('Qrscan', {event_data});
  }
  return (
    <View>
      <FlatList
        data={organizerevents}
        renderItem={({item}) => (
          <Eventcard
            details={item}
            scanner={() => {
              scanparticipant(item);
            }}></Eventcard>
        )}></FlatList>
    </View>
  );
};

export default Events;
