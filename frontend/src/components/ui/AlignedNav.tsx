import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../../components/ui/AppText';

const AlignedNav: React.FC = () => {
  const [isAmanda, setIsAmanda] = useState(true);

  const togglePartner = () => {
    setIsAmanda(!isAmanda);
  };

  return (
    <View style={styles.container}>
      <AppText variant="display" style={styles.alignedText}>
        aligned.
      </AppText>

      <Pressable style={styles.partnerContainer} onPress={togglePartner}>
        <AppText variant="smallCaps" style={styles.partnerName}>
          {isAmanda ? 'AMANDA' : 'LOU'}
        </AppText>
        <View style={styles.avatar}>
          <AppText style={styles.avatarText}>
            {isAmanda ? 'A' : 'L'}
          </AppText>
        </View>
      </Pressable>
    </View>
  );
};

export default AlignedNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  
    backgroundColor: Colors.bone,
    borderWidth:1,
    borderBottomColor:Colors.rule
  },
  alignedText: {
    fontSize: 23,
    letterSpacing: 0.5,
    color: Colors.ink,
  },
  partnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  partnerName: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: Colors.muted,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});