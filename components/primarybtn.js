import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import primary_text_color from '../defaults';

const Primarybtn = props => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={styles.background}>
        <Text style={{color: 'white', fontSize: 22, textAlign: 'center'}}>
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: primary_text_color,
    paddingHorizontal: 20,
    padding: 12,
    borderRadius: 15,
  },
});
export default Primarybtn;
