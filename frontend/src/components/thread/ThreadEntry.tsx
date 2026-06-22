import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../ui/AppText';
import { ThreadEntry as TEntry } from '../../types';
import { Config } from '../../constants/config';
import { Ionicons } from '@expo/vector-icons';

interface ThreadEntryProps {
  entry: TEntry;
}

const LABEL: Record<string, string> = {
  letter: 'Letter', 
  voice: 'Voice', 
  photo: 'Photograph',
  prompt: 'Prompt', 
  appreciation: 'Appreciation', 
  checkin: 'Check-in',
};

export const ThreadEntryCard: React.FC<ThreadEntryProps> = ({ entry: t }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <AppText variant="smallCaps" color={Colors.accent}>
        {LABEL[t.type]?.toUpperCase()}
      </AppText>
      <AppText variant="mono" style={{ fontSize: 9 }}>
        {t.date.toUpperCase()} · {t.time}
      </AppText>
    </View>

    {/* LETTER */}
    {t.type === 'letter' && (
      <View style={styles.letterBox}>
        <AppText size={42} color={Colors.accent} style={styles.openQuote}>"</AppText>
        <AppText variant="serifItalic" size={17} color={Colors.ink} style={{ lineHeight: 27, paddingTop: 6 }}>
          {t.text}
        </AppText>
        <View style={[styles.letterFooter, styles.border]}>
          <AppText variant="serifItalic" size={20} color={Colors.accent}>
            — {Config.DEMO_USERS[t.from].name}
          </AppText>
        </View>
      </View>
    )}

    {/* VOICE */}
    {t.type === 'voice' && (
      <View style={styles.voiceBox}>
        <View style={styles.voiceHeader}>
          <Ionicons name="mic" size={22} color={Colors.accent} />
          <AppText variant="mono" color={Colors.accent} style={{ marginLeft: 6 }}>VOICE MESSAGE</AppText>
        </View>
        
        <View style={styles.voicePlayer}>
          <Pressable style={styles.playButton}>
            <Ionicons name="play" size={10} color="black" />
          </Pressable>
          <View style={styles.waveform}>
            <AppText variant="mono" style={{ color: Colors.muted, fontSize: 11 }}>00:42</AppText>
          </View>
        </View>

        <AppText variant="mono" color={Colors.muted} style={{ fontSize: 10, marginTop: 8 }}>
          — {Config.DEMO_USERS[t.from].name.toUpperCase()}
        </AppText>
      </View>
    )}

    {/* PHOTO */}
    {t.type === 'photo' && (
      <View style={styles.photoBox}>
        

        <View style={styles.photoPreview}>
          <AppText style={{ fontSize: 60, color:Colors.accent }}>◐</AppText>
        </View>

        <View style={{shadowColor:'white'}}>
          <AppText variant="heading" size={17} style={{ marginTop: 12 }}>
          Morning espresso
        </AppText>
        <AppText variant="serifItalic" size={15} color={Colors.muted}>
          First light on the Pont Neuf
        </AppText>

        <AppText variant="mono" color={Colors.muted} style={{ fontSize: 10, marginTop: 10 }}>
          — {Config.DEMO_USERS[t.from].name.toUpperCase()}
        </AppText>
        </View>
      </View>
    )}

    {/* APPRECIATION */}
    {t.type === 'appreciation' && (
      <View style={styles.appreciationBox}>
        <AppText variant="serifItalic" size={18} color={Colors.ink} style={{ lineHeight: 28 }}>
          {t.text}
        </AppText>
        <AppText variant="mono" color={Colors.muted} style={{ fontSize: 10, marginTop: 6 }}>
          — {Config.DEMO_USERS[t.from].name.toUpperCase()} · APPRECIATION
        </AppText>
      </View>
    )}

    {/* CHECK-IN */}
    {t.type === 'checkin' && (
      <View style={styles.checkinBox}>
        <View style={styles.checkinHeader}>
          <AppText variant="smallCaps" color={Colors.muted}>◈ CHECK-IN</AppText>
        </View>
        {t.text && (
          <View style={styles.checkinField}>
            <AppText variant="serifItalic" size={15} color={Colors.ink}>
              {t.text}
            </AppText>
          </View>
        )}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
    paddingTop: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },

  // Letter
  letterBox: {
    padding: 22,
    backgroundColor: Colors.cream,
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: 14,
  },
  openQuote: {
    position: 'absolute',
    top: -8,
    left: 18,
    fontSize: 48,
    opacity: 0.15,
  },
  letterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 16,
    paddingTop: 12,
  },
  border: { borderTopWidth: 1, borderTopColor: Colors.rule },

  // Voice
  voiceBox: {
    backgroundColor: '#EAE2D4',
    borderRadius: 14,
    padding: 16,
  
  },
  voiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  voicePlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 26,
    backgroundColor: '#F4EEE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveform: {
    flex: 1,
    height: 40,
    backgroundColor: '#E8E1D6',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  // Photo
  photoBox: {
    backgroundColor: Colors.bone,
    borderRadius: 14,
    overflow: 'hidden',

  },
  photoHeader: {
    padding: 12,
  

  },
  photoPreview: {
    height: 220,
    backgroundColor: '#E6DDCD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:15,
  },

  // Appreciation
  appreciationBox: {
    paddingLeft: 20,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    paddingVertical: 4,
    
  },

  // Check-in
  checkinBox: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.bone,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  checkinHeader: {
    padding: 12,
    backgroundColor: Colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  checkinField: {
    padding: 16,
  },
});