import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { memo } from "react";
import { colors } from "../../utils/colors";
const SvgComponent = ({ focused }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none">
    <Path
      stroke={focused ? colors.tabIcon : colors.tabInActive}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.375 9.5h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3h-2a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h12Z"
    />
  </Svg>
);
const ChatIcon = memo(SvgComponent);
export default ChatIcon;
