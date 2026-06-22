import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../../constants/colors';
import { AppText } from '../../components/ui/AppText';
import { AppButton } from '../../components/ui/AppButton';
import { AppTextInput } from '../../components/ui/AppTextInput';
import { RootStackParamList } from '../../types';

type Nav = StackNavigationProp<RootStackParamList>;

export const VCOnboarding: React.FC = () => {
  const nav = useNavigation<Nav>();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [solo, setSolo] = useState(true);

  const steps = [
    {
      kicker: '01', title: 'Your name?', sub: 'Just so we know who\'s who.',
      body: <AppTextInput label="Your first name" n="01" value={name} onChangeText={setName} placeholder="You" />,
    },
    {
      kicker: '02', title: 'Who are you playing with?', sub: 'Their first name.',
      body: <AppTextInput label="Their first name" n="01" value={partnerName} onChangeText={setPartnerName} placeholder="Them" />,
    },
    {
      kicker: '03', title: 'How do you want to start?',
      body: (
        <View>
          {[{ k: true, l: 'Just me first', sub: 'Try a few cards solo, invite later' }, { k: false, l: 'Send the invite now', sub: 'Play together from card one' }].map(o => (
            <Pressable key={String(o.k)} onPress={() => setSolo(o.k)} style={styles.optRow}>
              <View style={{ flex: 1 }}>
                <AppText variant="heading" size={18}>{o.l}</AppText>
                <AppText variant="mono" color={Colors.light} style={{ fontSize: 10, marginTop: 2 }}>{o.sub.toUpperCase()}</AppText>
              </View>
              <AppText size={18} color={o.k === solo ? Colors.accent : Colors.rule}>{o.k === solo ? '●' : '○'}</AppText>
            </Pressable>
          ))}
        </View>
      ),
    },
  ];

  const cur = steps[step];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <AppText variant="smallCaps" color={Colors.muted}>vibe check</AppText>
          <AppText variant="mono" color={Colors.light} style={{ fontSize: 10 }}>
            {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </AppText>
        </View>

        <View style={{ flex: 1 }}>
          <AppText variant="smallCaps" color={Colors.accent} style={{ marginBottom: 14 }}>{cur.kicker}</AppText>
          <AppText variant="display" size={38} style={{ lineHeight: 38, marginBottom: 14 }}>{cur.title}</AppText>
          {cur.sub && <AppText variant="serifItalic" size={17} color={Colors.muted} style={{ marginBottom: 30, lineHeight: 25 }}>{cur.sub}</AppText>}
          {cur.body}
        </View>

        <View style={styles.progress}>
          {steps.map((_, i) => (
            <View key={i} style={[styles.bar, { backgroundColor: i <= step ? Colors.accent : Colors.rule }]} />
          ))}
        </View>

        <View style={styles.actions}>
          {step > 0 && <AppButton variant="outline" size="lg" onPress={() => setStep(s => s - 1)} style={{ flex: 1 }}>Back</AppButton>}
          <AppButton
            variant="solid" size="lg"
            style={{ flex: step > 0 ? 2 : 1 }}
            onPress={() => step < steps.length - 1 ? setStep(s => s + 1) : nav.navigate('VibeApp')}
          >
            {step === steps.length - 1 ? 'Start →' : 'Continue'}
          </AppButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bone },
  container: { flexGrow: 1, padding: 32 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 48 },
  optRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: Colors.rule, gap: 12,
  },
  progress: { flexDirection: 'row', gap: 4, marginBottom: 18 },
  bar: { flex: 1, height: 2, borderRadius: 1 },
  actions: { flexDirection: 'row', gap: 10 },
});