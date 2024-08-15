// import Snackbar from 'react-native-snackbar';
// import {COLORS} from './COLORS';

// export const ToastMessage = (message, type) => {
//   if (typeof message !== 'string') {
//     console.log('===========ToastMessageError', message);
//   } else {
//     Snackbar.show({
//       text: message,
//       duration: Snackbar.LENGTH_SHORT,
//       backgroundColor:
//         type == 'success'
//           ? COLORS.green
//           : type == 'error'
//           ? COLORS.red
//           : COLORS.lightGray,
//     });
//   }
// };
import Toast from "react-native-simple-toast";
export const ToastMessage = (message) => {
  if (typeof message == "string") {
    Toast.show(message);
  }
};
