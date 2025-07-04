import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import primary_text_color from '../defaults';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Eventcard from '../components/eventcard';
const Search = () => {
  const [usercode, setUsercode] = useState(null);
  const [event, setEvent] = useState(null);
  function searchevent() {
    firestore()
      .collection('Events')
      .where('event_id', '==', usercode)
      .get()
      .then(data => {
        setEvent([data.docs[0].data()]);
      });
  }
  return (
    <View style={styles.mainScreen}>
      <View style={styles.searchArea}>
        <TextInput
          placeholder="Enter the joining code"
          value={usercode}
          onChangeText={text => {
            setUsercode(text);
          }}></TextInput>
        <TouchableOpacity onPress={searchevent}>
          <Image
            source={require('../assets/images/Search.png')}
            style={{height: 40, width: 30}}></Image>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={event}
          renderItem={({item}) => (
            <Eventcard details={item}></Eventcard>
          )}></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainScreen: {
    padding: 5,
  },
  searchArea: {
    // padding: 20,
    borderBottomWidth: 1,
    margin: 40,
    borderColor: primary_text_color,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Search;
