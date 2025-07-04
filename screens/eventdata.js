import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Eventdata = () => {
  const route = useRoute();
  const {event_data} = route.params;
  const [listparticipants, setlistparticipants] = useState([]);
  const [appliedparticipants, setAppliedparticipants] = useState(0);
  const [attendedparticipants, setAttendedparticipants] = useState(0);

  useEffect(() => {
    firestore()
      .collection('Events')
      .where('event_id', '==', event_data.event_id)
      .get()
      .then(data => {
        if (!data.empty) {
          const applied = data.docs[0].data().applied_participants || [];
          const temp = [];
          let num = 0;
          let attended = 0;

          applied.forEach(i => {
            num = num + 1;
            if (i.attended === 'Yes') attended = attended + 1;
            temp.push(i);
          });

          setAppliedparticipants(num);
          setAttendedparticipants(attended);
          setlistparticipants(temp);
        }
      });
  }, []);

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <Text style={styles.participantName}>
        {index + 1}. {item.username || 'No Name'}
      </Text>
      <Text style={styles.email}>📧 {item.usermail || 'No Email'}</Text>
      <Text style={styles.attendance}>
        {item.attended === 'Yes' ? '      Attended' : '       Not Attended'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{event_data?.eventtitle || 'No Title'}</Text>
        <Text style={{textAlign: 'center', marginBottom: 5}}>
          Join Code: {event_data.event_id}
        </Text>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>
            👥 Applied: {appliedparticipants}
          </Text>
          <Text style={styles.summaryText}>
            ✅ Attended: {attendedparticipants}
          </Text>
        </View>

        <Text style={styles.subHeading}>List of Participants</Text>

        {listparticipants.length > 0 ? (
          <FlatList
            data={listparticipants}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false} // because inside ScrollView
          />
        ) : (
          <Text style={styles.emptyText}>No participants found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  summaryBox: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    color: '#444',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  card: {
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  email: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  attendance: {
    marginTop: 6,
    fontWeight: '500',
    color: '#006400',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#999',
  },
});

export default Eventdata;
