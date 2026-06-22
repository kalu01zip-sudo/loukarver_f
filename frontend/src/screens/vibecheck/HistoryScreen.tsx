import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../../components/ui/AppText';
import { Tag } from '../../components/ui/Tag';
import { usePersist } from '../../hooks/usePersist';
import { PlayHistoryEntry } from '../../types';
import { VibeTabs } from '@/navigation/VibeTabs';
import SamVibeNav from '@/components/ui/SamVibeNav';

const SEED: PlayHistoryEntry[] = [
  { card: { a: 'Beach', b: 'Mountains', cat: 'Travel' }, myPick: 'a', theirPick: 'a', date: 'Yesterday' },
  { card: { a: 'Stay in', b: 'Go out', cat: 'Energy' }, myPick: 'b', theirPick: 'b', date: '2 days ago' },
  { card: { a: 'Plan everything', b: 'Wing it', cat: 'Style' }, myPick: 'a', theirPick: 'b', date: '3 days ago' },
];

export const HistoryScreen: React.FC = () => {
  const [history] = usePersist<PlayHistoryEntry[]>('vc.c1.play.history', SEED);
  const [filter, setFilter] = useState<'all' | 'match' | 'differ'>('all');

  const filtered = filter === 'all'
    ? history
    : filter === 'match'
      ? history.filter(h => h.myPick === h.theirPick)
      : history.filter(h => h.myPick !== h.theirPick);

  return (
    <SafeAreaView style={styles.safe}>
      <SamVibeNav></SamVibeNav>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <AppText variant="display" size={42} style={{ lineHeight: 42, marginBottom: 6 }}>
            History<AppText size={42} color={Colors.accent}>.</AppText>
          </AppText>
          <AppText variant="serifItalic" size={16} color={Colors.muted} style={{ lineHeight: 24, marginBottom: 22 }}>
            Every card you've played together.
          </AppText>

          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 22 }}>
            <Tag active={filter === 'all'} onPress={() => setFilter('all')}>All</Tag>
            <Tag active={filter === 'match'} onPress={() => setFilter('match')}>Matched</Tag>
            <Tag active={filter === 'differ'} onPress={() => setFilter('differ')}>Differed</Tag>
          </View>

          {filtered.map((h, i) => {
            const matched = h.myPick === h.theirPick;
            return (
              <View key={i} style={styles.card}>
                <View style={styles.cardHeader}>
                  <AppText variant="smallCaps" color={Colors.muted}>{h.card.cat}</AppText>
                  <AppText variant="mono" color={matched ? Colors.sage : Colors.accent} style={{ fontSize: 10 }}>
                    {matched ? '● MATCH' : '● DIFFER'}
                  </AppText>
                </View>
                <View style={styles.optRow}>
                  <View style={[styles.opt, h.myPick === 'a' && (matched ? styles.optMatchActive : styles.optMineActive)]}>
                    <AppText variant="heading" size={13}>{h.card.a}</AppText>
                  </View>
                  <View style={[styles.opt, h.myPick === 'b' && (matched ? styles.optMatchActive : styles.optMineActive)]}>
                    <AppText variant="heading" size={13}>{h.card.b}</AppText>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <AppText variant="mono" color={Colors.light} style={{ fontSize: 9 }}>
                    YOU PICKED {h.myPick.toUpperCase()} · THEM {h.theirPick.toUpperCase()}
                  </AppText>
                  <AppText variant="mono" color={Colors.light} style={{ fontSize: 9 }}>{h.date.toUpperCase()}</AppText>
                </View>
              </View>
            );
          })}

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bone },
  inner: { padding: 24 },
  card: {
    borderRadius: 14, padding: 16, backgroundColor: Colors.bone,
    borderWidth: 1, borderColor: Colors.rule, marginBottom: 10,
    shadowColor: Colors.ink2, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  optRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  opt: { flex: 1, padding: 10, borderRadius: 10, backgroundColor: Colors.cream, alignItems: 'center' },
  optMineActive: { backgroundColor: Colors.accent,  color:Colors.white },
  optMatchActive: { backgroundColor: Colors.accent, color:Colors.white },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
});