import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigation from './bottomnav';
import Events from './eventsScreen';
import primary_text_color from '../defaults';
import CustomDrawer from './CustomDrawer';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../App';
import Event_participant from './participant_events';
import Profilescreen from './profileScreen';
const Drawer = createDrawerNavigator();

function DrawerNav({navigation}) {
  const {userdata, setUserdata} = useContext(UserContext);
  function EventsScreen() {}
  function SettingsScreen() {}
  function Sharefunc() {}
  const isOrganiser = userdata?.role;
  return (
    <Drawer.Navigator
      initialRouteName="Festify"
      screenOptions={{
        headerStyle: {backgroundColor: primary_text_color, elevation: 4},
        headerTintColor: '#FFFFFF',
        headerShadowVisible: true,
      }}
      drawerContent={props => <CustomDrawer {...props}></CustomDrawer>}>
      <Drawer.Screen
        name="Festify"
        component={BottomNavigation}
        options={{
          drawerIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../assets/images/home.png')}
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? primary_text_color : 'black',
                }}></Image>
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? primary_text_color : 'black'}}>
                Home
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          drawerIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../assets/images/user.png')}
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? primary_text_color : 'black',
                }}></Image>
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? primary_text_color : 'black'}}>
                Profile
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Events"
        component={isOrganiser === 'Organizer' ? Events : Event_participant}
        options={{
          drawerIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../assets/images/calendar-check.png')}
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? primary_text_color : 'black',
                }}></Image>
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? primary_text_color : 'black'}}>
                Events
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../assets/images/settings.png')}
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? primary_text_color : 'black',
                }}></Image>
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? primary_text_color : 'black'}}>
                Settings
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Share"
        component={Sharefunc}
        options={{
          drawerIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../assets/images/share.png')}
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? primary_text_color : 'black',
                }}></Image>
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? primary_text_color : 'black'}}>
                Share
              </Text>
            );
          },
        }}
      />

      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNav;
