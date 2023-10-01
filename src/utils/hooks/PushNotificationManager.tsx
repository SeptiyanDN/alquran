import { useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function requestUserPermission() {
  const authStatus: FirebaseMessagingTypes.AuthorizationStatus =
    await messaging().requestPermission();
  const enabled: boolean =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage, 'remoteMessage1');
});

async function onDisplayNotification() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.requestPermission();
  await notifee.displayNotification({
    id: '123',
    title: 'Terimakasih',
    body: 'Anda Telah Mengaktifkan Notifikasi Untuk Melihat Update Terbaru Dari Kami!',
    android: {
      channelId,
    },
  });
}
export const usePushNotificationManager = () => {
  useEffect(() => {
    onDisplayNotification();
    async function initializePushNotifications() {
      await requestUserPermission();

      messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, 'remoteMessage2');
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
      
        await notifee.requestPermission();
        await notifee.displayNotification({
          id: '123',
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
          },
        });
      });

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(remoteMessage, 'remoteMessage123');
          }
        });
    }

    initializePushNotifications();
  }, []);
};

