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
      d="M6.125 21.5v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m-10-14a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
    />
  </Svg>
);
const AccountIcon = memo(SvgComponent);
export default AccountIcon;
