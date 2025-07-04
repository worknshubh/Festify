import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import primary_text_color from '../defaults';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Scan_participants = () => {
  const route = useRoute();
  const {event_data} = route.params;
  const [scanning, setScanning] = useState(false);
  return (
    <View style={styles.container}>
      {/* Camera in background */}
      <Camera
        scanBarcode={true}
        onReadCode={event => {
          if (scanning) return;
          setScanning(true);
          const scannedcode = event.nativeEvent.codeStringValue;
          firestore()
            .collection('Events')
            .where('event_id', '==', event_data.event_id)
            .get()
            .then(data => {
              const doc = data.docs[0];
              // console.log(data.docs[0].data().applied_participants);
              const eventRef = doc.ref;
              const participants =
                data.docs[0].data().applied_participants || [];
              const matched = participants.find(
                p => p.userentrypass === scannedcode,
              );
              if (matched) {
                Alert.alert('Entry Allowed Username : ' + matched.username);
                matched.attended = 'Yes';
                eventRef.update({
                  applied_participants: participants,
                });
                firestore()
                  .collection('users')
                  .doc(matched.useruid)
                  .get()
                  .then(data => {
                    const applied_events = data.data().events_applied || [];
                    const found = applied_events.find(
                      i => i.event_id === event_data.event_id,
                    );
                    if (found) {
                      found.attended = 'Yes';
                      firestore()
                        .collection('users')
                        .doc(matched.useruid)
                        .update({
                          events_applied: applied_events,
                        });
                    }
                  });
              } else {
                Alert.alert('User Not Registered ');
              }
              setTimeout(() => setScanning(false), 2000);
            });
        }}
        showFrame={true}
        laserColor={primary_text_color}
        frameColor="white"
        flashMode="auto"
        style={StyleSheet.absoluteFillObject}
        barcodeFrameSize={{height: 300, width: 300}}
      />

      {/* Overlay text above camera */}
      <View style={styles.overlay}>
        <Text style={styles.heading}>Scan QR Code</Text>
        <Text style={styles.subtext}>Place the Scanner Inside the QR Box</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default Scan_participants;
