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
      d="M9.875 21.5v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6m-10-9h-2l9-9 9 9h-2v7a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-7Z"
    />
  </Svg>
);
const HomeIcon = memo(SvgComponent);
export default HomeIcon;
