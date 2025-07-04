import React, {useState, useEffect, createContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Login from './screens/loginScreen';
import Signup from './screens/signupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNav from './screens/drawermenu';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Splash from './screens/splashscreen';
import Createscreen from './screens/createScreen';
import primary_text_color from './defaults';
import Eventapply from './screens/eventapply';
import Event_participant from './screens/participant_events';
import Qrgen from './screens/qrgen_participant';
import Scan_participants from './screens/scan_participants';
import Eventdata from './screens/eventdata';
import Profilescreen from './screens/profileScreen';
const Stack = createStackNavigator();
export const UserContext = createContext();

const App = () => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            setUserdata(snapshot.docs[0].data());
          }
        });
    } else {
    }
  }, []);

  return (
    <UserContext.Provider value={{userdata, setUserdata}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="SignupScreen"
            component={Signup}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="DrawerMenu"
            component={DrawerNav}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="createScreen"
            component={Createscreen}
            options={{
              headerTitle: 'Create Event',
              headerStyle: {backgroundColor: primary_text_color},
              headerTintColor: 'white',
            }}></Stack.Screen>
          <Stack.Screen
            name="EventApply"
            component={Eventapply}
            options={{
              headerTitle: 'Register Event',
              headerStyle: {backgroundColor: primary_text_color},
              headerTintColor: 'white',
            }}></Stack.Screen>
          <Stack.Screen
            name="Participant_event"
            component={Event_participant}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Qrgen"
            component={Qrgen}
            options={{
              headerTitle: 'Scan QR Code',
              headerStyle: {backgroundColor: primary_text_color},
              headerTintColor: 'white',
            }}></Stack.Screen>
          <Stack.Screen
            name="Qrscan"
            component={Scan_participants}
            options={{
              headerTitle: 'Scan QR Code',
              headerStyle: {backgroundColor: primary_text_color},
              headerTintColor: 'white',
            }}></Stack.Screen>
          <Stack.Screen
            name="Eventdata"
            component={Eventdata}
            options={{
              headerTitle: 'About Event',
              headerStyle: {backgroundColor: primary_text_color},
              headerTintColor: 'white',
            }}></Stack.Screen>
          <Stack.Screen
            name="Profilescreen"
            component={Profilescreen}
            options={{
              headerShown: false,
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
