import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Fonts } from '../../constants/fonts';
import { Colors } from '../../constants/colors';

type Variant = 'heading' | 'display' | 'serif' | 'serifItalic' | 'mono' | 'smallCaps' | 'body';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  size?: number;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = Colors.ink,
  size,
  style,
  children,
  ...rest
}) => {
  const variantStyle = styles[variant];
  return (
    <Text
      style={[variantStyle, { color }, size ? { fontSize: size } : undefined, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.fraunces,
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: -0.8,
    color: Colors.ink,
  },
  display: {
    fontFamily: Fonts.frauncesLight,
    fontSize: 64,
    fontWeight: '200',
    letterSpacing: -2,
    lineHeight: 64,
    color: Colors.ink,
  },
  serif: {
    fontFamily: Fonts.instrumentSerif,
    fontSize: 16,
    color: Colors.ink,
  },
  serifItalic: {
    fontFamily: Fonts.instrumentSerifItalic,
    fontSize: 16,
    color: Colors.ink,
  },
  mono: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: Colors.muted,
  },
  smallCaps: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: Colors.muted,
  },
  body: {
    fontFamily: Fonts.instrumentSerif,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.ink2,
  },
});