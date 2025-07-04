import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert, ScrollView} from 'react-native';
import primary_text_color from '../defaults';
import Primarybtn from '../components/primarybtn';
import {useRoute} from '@react-navigation/native';
import {UserContext} from '../App';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Eventapply = () => {
  const {userdata, setUserdata} = useContext(UserContext);
  const route = useRoute();
  const {eventdata} = route.params;
  function redirecttohome() {
    const applier = {
      username: userdata.username,
      usermail: userdata.useremail,
      userinstitute: userdata.userinstitute,
      attended: 'No',
      useruid: userdata.uid,
      userentrypass: `${userdata.uid}_${eventdata.event_id}`,
    };

    const eventdetails = {
      eventname: eventdata.eventtitle,
      event_id: eventdata.event_id,
      eventdate: eventdata.eventdate,
      eventtime: eventdata.eventtime,
      eventvenue: eventdata.eventvenue,
      attended: 'No',
      evententrypass: `${userdata.uid}_${eventdata.event_id}`,
    };

    firestore()
      .collection('Events')
      .where('event_id', '==', eventdata.event_id)
      .get()
      .then(data => {
        const doc = data.docs[0];
        const ref = doc.ref;

        ref.update({
          applied_participants: firestore.FieldValue.arrayUnion(applier),
        });
      })
      .then(() => {
        Alert.alert('Registered Successfully');
      });

    firestore()
      .collection('users')
      .doc(userdata.uid)
      .update({events_applied: firestore.FieldValue.arrayUnion(eventdetails)});
  }
  return (
    <ScrollView>
      <View style={styles.banner}>
        <Image
          source={{uri: eventdata.eventbanner}}
          style={{height: 160, width: '100%'}}
          resizeMode="cover"></Image>
      </View>
      <View style={styles.logo}>
        <Image
          source={{uri: eventdata.eventlogo}}
          style={{
            resizeMode: 'cover',
            height: 147,
            borderRadius: 100,
          }}></Image>
      </View>
      <View style={styles.event_title}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          {eventdata.eventtitle}
        </Text>
      </View>
      <View style={styles.datentime}>
        <Text>Date: {eventdata.eventdate}</Text>
        <Text> Time: {eventdata.eventtime}</Text>
      </View>
      <View style={styles.institution}>
        <Text style={{fontSize: 18}}>
          Institution: {eventdata.eventuniversity}
        </Text>
        <Text style={{fontSize: 18, marginTop: 10}}>
          Venue: {eventdata.eventvenue}
        </Text>
      </View>
      <View style={{marginHorizontal: 50, marginBottom: 10}}>
        <Text style={{marginBottom: 5}}>Description</Text>
        <Text style={{fontSize: 16}}>{eventdata.eventdesc}</Text>
      </View>
      <View style={{marginVertical: 30}}>
        <Primarybtn name="Register" redirect={redirecttohome}></Primarybtn>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 160,
    backgroundColor: '#D9D9D9',
  },
  logo: {
    height: 150,
    width: 150,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: 80,
    borderColor: primary_text_color,
    borderWidth: 2,
  },
  event_title: {
    marginTop: 90,
  },
  datentime: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  institution: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
});
export default Eventapply;
