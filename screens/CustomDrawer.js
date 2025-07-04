import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import primary_text_color from '../defaults';
import {UserContext} from '../App';
const CustomDrawer = props => {
  const {userdata, setUserdata} = useContext(UserContext);
  const [userpic, setuserpic] = useState(
    require('../assets/images/userprofile.png'),
  );
  useEffect(() => {
    if (userdata?.profile_pic != '') {
      setuserpic({uri: userdata?.profile_pic});
    }
  }, [userdata?.profile_pic]);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={userpic}
          style={{
            height: 140,
            width: 140,
            borderRadius: 100,
            marginBottom: 10,
          }}></Image>
        <Text
          style={{
            fontSize: 24,
            color: primary_text_color,
            fontFamily: 'Lato-Regular',
          }}>
          {userdata?.username}
        </Text>
        <Text style={{fontSize: 18, marginTop: 5, fontFamily: 'Lato-Light'}}>
          {userdata?.role}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}></DrawerItemList>
        <TouchableOpacity
          onPress={() => {
            setUserdata(null);
            auth()
              .signOut()
              .then(() => {
                navigation.replace('LoginScreen');
              });
          }}
          style={{padding: 16, marginLeft: 4}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/logout.png')}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text style={{fontSize: 14}}>Logout</Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;
