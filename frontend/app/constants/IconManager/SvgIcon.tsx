import React from "react";
import { SvgUri } from "react-native-svg";

interface SvgIconProps {
  uri: string;
  width: number;
  height: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({ uri, width, height }) => {
  return <SvgUri uri={uri} width={width} height={height} />;
};

export default SvgIcon;
