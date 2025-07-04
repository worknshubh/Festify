import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const Eventcard = props => {
  return (
    <TouchableOpacity
      onPress={props.apply || props.qrgen || props.scanner || props.eventdata}
      style={styles.mainevent}>
      <View style={styles.toptwo}>
        <Text style={{fontSize: 24}}>{props.details.eventtitle}</Text>
        <Text style={{fontSize: 16, fontFamily: 'Lato-Light', marginTop: 3}}>
          {props.details.eventuniversity}
        </Text>
      </View>
      <View style={styles.datentime}>
        <Text style={styles.date}>
          📅{'   '}
          {props.details.eventdate}{' '}
        </Text>
        <Text style={[styles.date, {marginLeft: 5}]}>
          🕒{'   '}
          {props.details.eventtime}{' '}
        </Text>
      </View>
      <View>
        <Text>
          📍{'   '}
          {props.details.eventvenue}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  toptwo: {marginBottom: 8},
  datentime: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  date: {
    fontSize: 13,
  },
  mainevent: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 20,
    // borderWidth: 2,
    elevation: 5,
    overflow: 'hidden',
  },
});
export default Eventcard;
