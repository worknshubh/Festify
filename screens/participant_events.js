import React, {useEffect, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../App';
import {FlatList} from 'react-native-gesture-handler';
import Eventcard from '../components/eventcard';

const Event_participant = ({navigation}) => {
  const [userevents, setUserevents] = useState([]);
  const {userdata, setUserdata} = useContext(UserContext);
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(userdata.uid)
      .get()
      .then(data => {
        const applied_events = data.data().events_applied;
        for (const eventid of applied_events) {
          firestore()
            .collection('Events')
            .where('event_id', '==', eventid.event_id)
            .get()
            .then(data => {
              const temp = [];
              data.forEach(doc => {
                temp.push(doc.data());
              });
              setUserevents(prev => [...prev, ...temp]);
            });
        }
      });
  }, []);
  function redirecttoqrgen(usereventdata) {
    navigation.navigate('Qrgen', {usereventdata});
  }
  return (
    <View>
      <FlatList
        data={userevents}
        renderItem={({item}) => (
          <Eventcard
            details={item}
            qrgen={() => {
              redirecttoqrgen(item);
            }}></Eventcard>
        )}></FlatList>
    </View>
  );
};

export default Event_participant;
