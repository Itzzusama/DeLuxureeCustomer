import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {colors} from '../../utils/colors';

const SvgComponent = ({focused}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} fill="none">
    <Path
      stroke={focused ? colors.primaryColor : '#B7B7B7'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.917}
      d="M13.333 1.375 9.5 6.167m3.833-4.792H5.667m7.666 0a1.916 1.916 0 0 1 1.917 1.917v2.081c0 .508.202.996.562 1.355l.793.794c.36.36.562.847.562 1.355v7.831a1.917 1.917 0 0 1-1.917 1.917h-3.833A1.916 1.916 0 0 1 9.5 16.708m0-10.541L5.667 1.375M9.5 6.167v10.541M5.667 1.375A1.917 1.917 0 0 0 3.75 3.292v2.081c0 .508-.202.996-.562 1.355l-.793.794c-.36.36-.562.847-.562 1.355v7.831a1.916 1.916 0 0 0 1.917 1.917h3.833A1.916 1.916 0 0 0 9.5 16.708m7.667-5.75h-2.875a.958.958 0 0 0-.959.959v1.916a.958.958 0 0 0 .959.959h2.875m-15.334 0h2.875a.958.958 0 0 0 .959-.959v-1.916a.958.958 0 0 0-.959-.959H1.833"
    />
  </Svg>
);
const TechIcon = memo(SvgComponent);
export default TechIcon;
