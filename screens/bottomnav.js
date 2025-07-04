import React, {useContext} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './homeScreen';
import Events from './eventsScreen';
import Search from './searchScreen';
import {UserContext} from '../App';
import Createscreen from './createScreen';
import Createevent from './createEvent';
import primary_text_color from '../defaults';
import Event_participant from './participant_events';
const BottomNav = createBottomTabNavigator();

const BottomNavigation = () => {
  const {userdata} = useContext(UserContext);
  const isOrganiser = userdata?.role;
  return (
    <BottomNav.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name == 'Home') {
            if (focused) {
              return (
                <Image
                  source={require('../assets/images/home_hover.png')}
                  style={{height: 29, width: 29}}></Image>
              );
            } else {
              return (
                <Image
                  source={require('../assets/images/homee.png')}
                  style={{height: 40, width: 40}}></Image>
              );
            }
          }
        },
      })}>
      <BottomNav.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}></BottomNav.Screen>
      <BottomNav.Screen
        name={isOrganiser === 'Organizer' ? 'Scanner' : 'Events'}
        component={isOrganiser === 'Organizer' ? Events : Event_participant}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (focused) {
              if (isOrganiser === 'Organizer') {
                return (
                  <Image
                    source={require('../assets/images/scan_hover.png')}
                    style={{height: 25, width: 25}}></Image>
                );
              } else {
                return (
                  <Image
                    source={require('../assets/images/calendar-check.png')}
                    style={{
                      height: 35,
                      width: 30,
                      tintColor: '#0026FF',
                    }}></Image>
                );
              }
            } else {
              if (isOrganiser === 'Organizer') {
                return (
                  <Image
                    source={require('../assets/images/scan.png')}
                    style={{height: 25, width: 25}}></Image>
                );
              } else {
                return (
                  <Image
                    source={require('../assets/images/calendar-check.png')}
                    style={{
                      height: 35,
                      width: 30,
                      tintColor: primary_text_color,
                    }}></Image>
                );
              }
            }
          },
        }}></BottomNav.Screen>
      <BottomNav.Screen
        name={isOrganiser === 'Organizer' ? 'Create' : 'Search'}
        component={isOrganiser === 'Organizer' ? Createevent : Search}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            if (focused) {
              if (isOrganiser === 'Organizer') {
                return (
                  <Image
                    source={require('../assets/images/create_hover.png')}
                    style={{height: 28, width: 28}}></Image>
                );
              } else {
                return (
                  <Image
                    source={require('../assets/images/search_hover.png')}
                    style={{height: 40, width: 40}}></Image>
                );
              }
            } else {
              if (isOrganiser === 'Organizer') {
                return (
                  <Image
                    source={require('../assets/images/create.png')}
                    style={{height: 28, width: 28}}></Image>
                );
              } else {
                return (
                  <Image
                    source={require('../assets/images/Search.png')}
                    style={{height: 40, width: 40}}></Image>
                );
              }
            }
          },
        }}></BottomNav.Screen>
    </BottomNav.Navigator>
  );
};

export default BottomNavigation;
