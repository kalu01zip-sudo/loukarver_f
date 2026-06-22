import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { AppText } from './AppText';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  n?: string;
  containerStyle?: ViewStyle;
  multiline?: boolean;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  n,
  containerStyle,
  style,
  multiline = false,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelRow}>
          {n && <AppText variant="mono" style={styles.n}>{n}</AppText>}
          <AppText variant="smallCaps" color={Colors.ink2}>{label}</AppText>
        </View>
      )}
      <TextInput
        style={[styles.input, multiline && styles.multiline, style]}
        placeholderTextColor={'#b3b3b3'}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...rest}
      />
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 22 },
  labelRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  n: { fontSize: 9, color: Colors.light, letterSpacing: 2 },
  input: {
    fontFamily: Fonts.fraunces,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.ink,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  multiline: { minHeight: 80, paddingTop: 8 },
  underline: { height: 1, backgroundColor: Colors.rule, marginTop: 2 },
});