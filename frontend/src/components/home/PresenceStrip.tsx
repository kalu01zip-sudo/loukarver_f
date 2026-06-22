import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../ui/AppText';
import { Config, UserId } from '../../constants/config';
import { formatTime } from '../../utils/dateUtils';

interface PresenceStripProps {
  activeUser: UserId;
}

export const PresenceStrip: React.FC<PresenceStripProps> = ({ activeUser }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const partner = activeUser === 'lou' ? 'amanda' : 'lou';
  const pData = Config.DEMO_USERS[partner];

  // Compute partner's local time
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const partnerTime = new Date(utc + pData.tz * 3_600_000);
  const pHour = partnerTime.getHours();

  const getTimeOfDay = (h: number): string => {
    if (h < 5) return 'still awake';
    if (h < 12) return 'just waking up';
    if (h < 17) return 'in the middle of her day';
    if (h < 21) return 'winding down';
    return 'probably asleep';
  };

  const isOnline = pHour >= 5 && pHour < 21;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <AppText variant="mono" color={Colors.bone} style={{ fontSize: 13, fontWeight: '500' }}>
              {pData.initial}
            </AppText>
          </View>
          {isOnline && <View style={styles.dot} />}
        </View>
        <View>
          <AppText variant="smallCaps" color={Colors.muted} style={{ marginBottom: 2 }}>
            {pData.shortCity.toUpperCase()} · {formatTime(partnerTime)}
          </AppText>
          <AppText variant="serifItalic" size={15} color={Colors.ink2}>
            {pData.name}, <AppText variant="serifItalic" size={15} color={Colors.muted}>{getTimeOfDay(pHour)}</AppText>
          </AppText>
        </View>
      </View>
      <AppText variant="mono" color={Colors.light} style={{ fontSize: 10 }}>
        {isOnline ? '● HERE' : '○ AWAY'}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.bone,
  },
});