import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import Eventcard from '../components/eventcard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../App';
import {FlatList} from 'react-native-gesture-handler';
const Home = ({navigation}) => {
  const {userdata} = useContext(UserContext);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    console.log('Fetching events for:', userdata?.userinstitute);
    firestore()
      .collection('Events')
      .where('eventuniversity', 'in', [userdata?.userinstitute, 'Open'])
      .get()
      .then(data => {
        const temp = [];
        data.forEach(doc => {
          console.log(doc.data());
          temp.push(doc.data());
        });
        setEventList(temp);
      });
  }, [userdata]);

  function applyevent(data) {
    navigation.navigate('EventApply', {eventdata: data});
  }
  return (
    <View>
      <FlatList
        data={eventList}
        renderItem={({item}) => (
          <Eventcard
            details={item}
            apply={() => {
              applyevent(item);
            }}></Eventcard>
        )}></FlatList>
    </View>
  );
};

export default Home;
