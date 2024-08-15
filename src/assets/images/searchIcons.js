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
      d="m21.625 21.5-6-6m-12-5a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z"
    />
  </Svg>
);
const SearchIcon = memo(SvgComponent);
export default SearchIcon;
