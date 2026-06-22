import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../ui/AppText';
import { DateEntry } from '../../types';
import { formatDateShort, format24to12 } from '../../utils/dateUtils';

interface DateCardProps {
  entry: DateEntry;
  index: number;
  onPress: () => void;
}

const STATUS_COLOR: Record<string, string> = {
  completed: Colors.sage,
  accepted: Colors.accent,
  proposed: Colors.muted,
  cancelled: Colors.light,
};

export const DateCard: React.FC<DateCardProps> = ({ entry: d, index, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    <View style={styles.header}>
      <AppText variant="mono" color={Colors.light} style={{ fontSize: 9 }}>
        №{String(index + 1).padStart(2, '0')}
      </AppText>
      <AppText variant="mono" color={STATUS_COLOR[d.status]} style={{ fontSize: 10 }}>
        {d.status.toUpperCase()}
      </AppText>
    </View>
    <AppText variant="heading" size={22} style={{ marginBottom: 4, lineHeight: 26 }}>
      {d.title ?? d.venue}
    </AppText>
    <AppText variant="serifItalic" size={14} color={Colors.muted}>
      {d.venue}{d.date ? ` · ${formatDateShort(d.date)}` : ''}
      {d.exactTime ? ` · ${format24to12(d.exactTime)}` : ''}
    </AppText>
    {d.rating !== undefined && (
      <AppText variant="mono" color={Colors.accent} style={{ fontSize: 11, marginTop: 10 }}>
        {'★'.repeat(d.rating)}{'☆'.repeat(5 - d.rating)}
      </AppText>
    )}
    {d.memory && (
      <View style={styles.memory}>
        <AppText variant="serifItalic" size={14} color={Colors.ink2} style={{ lineHeight: 22 }}>
          {d.memory}
        </AppText>
      </View>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  memory: {
    marginTop: 8,
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
  },
});