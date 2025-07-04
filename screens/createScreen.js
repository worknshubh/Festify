import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import primary_text_color from '../defaults';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';
import Primarybtn from '../components/primarybtn';
import randomatic from 'randomatic';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Createscreen = () => {
  const [eventtitle, setEventtile] = useState('');
  const [eventvenue, setEventvenue] = useState('');
  const [eventdate, setEventdate] = useState('');
  const [eventtime, setEventtime] = useState('');
  const [eventuniversity, setEventuniversity] = useState('');
  const [eventdesc, setEventdesc] = useState('');
  const [event_id, setEventid] = useState('');
  const [eventbanner, setEventbanner] = useState('');
  const [eventlogo, setEventlogo] = useState('');
  function saveandpublish() {
    const temp = randomatic('Aa0', 10);
    setEventid(temp);
    firestore()
      .collection('Events')
      .add({
        eventtitle: eventtitle,
        organizer: auth().currentUser.uid,
        eventvenue: eventvenue,
        eventbanner: eventbanner,
        eventlogo: eventlogo,
        eventuniversity: eventuniversity,
        eventdate: eventdate,
        eventtime: eventtime,
        eventdesc: eventdesc,
        event_id: temp,
        applied_participants: [],
      })
      .then(() => {
        Alert.alert('Published');
        setEventdate('');
        setEventtile('');
        setEventtime('');
        setEventvenue('');
        setEventuniversity('');
        setEventdesc('');
      });
  }
  function setbanner() {
    launchImageLibrary({mediaType: 'photo'}, data => {
      const banner = data.assets[0].uri;
      const cloudnaryUpload = banner => {
        const data = new FormData();
        data.append('file', {
          uri: banner,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        data.append('upload_preset', 'festify_banner');
        data.append('cloud_name', 'drjbxyfr6');
        fetch('https://api.cloudinary.com/v1_1/drjbxyfr6/upload', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(res => res.json())
          .then(output => {
            console.log(output);
            setEventbanner(output.secure_url);
          });
      };
      cloudnaryUpload(banner);
    });
  }
  function setlogo() {
    launchImageLibrary({mediaType: 'photo'}, data => {
      const logo = data.assets[0].uri;
      const cloudnaryUpload = logo => {
        const data = new FormData();
        data.append('file', {
          uri: logo,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        data.append('upload_preset', 'festify_logo');
        data.append('cloud_name', 'drjbxyfr6');
        fetch('https://api.cloudinary.com/v1_1/drjbxyfr6/upload', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(res => res.json())
          .then(output => {
            console.log(output);
            setEventlogo(output.secure_url);
          });
      };
      cloudnaryUpload(logo);
    });
  }
  return (
    <ScrollView>
      <TouchableOpacity onPress={setbanner}>
        <View style={styles.banner}>
          <Image
            source={{uri: eventbanner}}
            style={{height: 160, width: '100%'}}
            resizeMode="cover"></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={setlogo}>
        <View style={styles.logo}>
          <Image
            source={{uri: eventlogo}}
            style={{
              resizeMode: 'cover',
              height: 147,
              borderRadius: 100,
            }}></Image>
        </View>
      </TouchableOpacity>
      <View style={styles.event_title}>
        <TextInput
          placeholder="Event Title"
          style={{
            padding: 10,
            fontSize: 20,
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
          }}
          value={eventtitle}
          onChangeText={text => {
            setEventtile(text);
          }}
        />
      </View>
      <View style={styles.event_venue}>
        <TextInput
          placeholder="Event Venue"
          style={{
            padding: 10,
            fontSize: 20,
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
          }}
          value={eventvenue}
          onChangeText={text => {
            setEventvenue(text);
          }}
        />
      </View>
      <View style={styles.event_date_time}>
        <TextInput
          placeholder="Event Date"
          style={{
            padding: 10,
            fontSize: 20,
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
            width: 180,
          }}
          value={eventdate}
          onChangeText={text => {
            setEventdate(text);
          }}
        />
        <TextInput
          placeholder="Event Time"
          style={{
            padding: 10,
            fontSize: 20,
            borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
            width: 150,
          }}
          value={eventtime}
          onChangeText={text => {
            setEventtime(text);
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 30,
          borderBottomWidth: 1,
          borderColor: primary_text_color,
        }}>
        <Picker
          selectedValue={eventuniversity}
          onValueChange={value => {
            setEventuniversity(value);
          }}>
          <Picker.Item
            label="Select University"
            value=""
            style={{fontSize: 20}}></Picker.Item>
          <Picker.Item
            label="Institute of Engineering and Management"
            value="Institute of Engineering and Management"
            style={{fontSize: 20}}></Picker.Item>
          <Picker.Item
            label="Techno India University"
            value="Techno India University"
            style={{fontSize: 20}}></Picker.Item>
          <Picker.Item
            label="Brainware University"
            value="Brainware University"
            style={{fontSize: 20}}></Picker.Item>
          <Picker.Item
            label="Open for All"
            value="Open"
            style={{fontSize: 20}}></Picker.Item>
        </Picker>
      </View>
      <View style={styles.event_desc}>
        <TextInput
          placeholder="Enter description of the Event"
          style={{
            padding: 10,
            fontSize: 20,
            // borderBottomWidth: 1,
            borderColor: primary_text_color,
            marginBottom: 20,
          }}
          multiline
          value={eventdesc}
          onChangeText={text => {
            setEventdesc(text);
          }}></TextInput>
      </View>
      <View style={{marginTop: 30, marginBottom: 80}}>
        <Primarybtn name="Publish" redirect={saveandpublish} />
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
    top: -90,
    borderColor: primary_text_color,
    borderWidth: 2,
  },
  event_title: {
    marginTop: 80,
    marginHorizontal: 30,
    // borderWidth: 2,
  },
  event_desc: {
    marginTop: 30,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: primary_text_color,
    height: 200,
  },
  event_venue: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  event_date_time: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
});

export default Createscreen;
