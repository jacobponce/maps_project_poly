// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { MaterialIcons } from '@expo/vector-icons';
import { type ComponentProps } from 'react';

export function Icon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export function EventsIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
  return <MaterialIcons size = {24} style={[{marginBottom:-3}, style]}{...rest}/>;
}

