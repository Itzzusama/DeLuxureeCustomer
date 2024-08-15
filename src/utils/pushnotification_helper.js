import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    // Permission not granted, ask the user to grant permission
    try {
      const newAuthStatus = await messaging().requestPermission();
      const newEnabled =
        newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (newEnabled) {
        await GetFCMToken();
      } else {
        console.log("Permission denied by user.");
        // Handle the case where the user denied permission
      }
    } catch (error) {
      console.log("Error requesting permission:", error);
      // Handle any errors that occur during permission request
    }
  } else {
    console.log("Authorization status:", authStatus);
    await GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem("fcmToken");
  if (fcmtoken == null || fcmtoken == "") {
    try {
      const newFcmtoken = await messaging().getToken();
      if (newFcmtoken) {
        await AsyncStorage.setItem("fcmToken", newFcmtoken);
      }
    } catch (error) {
      console.log(error, "error in fcm token");
    }
  }
}

const NotificationListner = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log("notification on foreground state.....", remoteMessage);
  });
};

export { requestUserPermission, NotificationListner };
