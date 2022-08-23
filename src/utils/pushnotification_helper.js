import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainURL } from '../../Context/Route';
import axios from "axios";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken, "old token");
    if(!fcmtoken){
        try {
            const fcmtoken = await messaging().getToken();
            if(fcmtoken) {
                console.log(fcmtoken, "new token");
                await AsyncStorage.setItem("fcmtoken", fcmtoken);
                
                const data = {
                    "device_token": fcmtoken
                }
                const url = `${mainURL}/user/login`
                
                await axios.post(url, data
                ).then((result) => {
                    console.log('axios 요청 성공')
        
                }).catch((err) => {
                    console.log(`getFCMToken err = ${err}`);
                });
            }
        } catch (error) {
            console.log(error, "error in fcmtoken");
        }
    }
}

export const NotificationListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage(async remoteMessage => {
        console.log("noti on froground state", remoteMessage);
    })
}