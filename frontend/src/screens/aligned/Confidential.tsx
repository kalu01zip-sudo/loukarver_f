import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../../components/ui/AppText';
import { AppButton } from '../../components/ui/AppButton';

const Confidential: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppText variant="mono" style={styles.headerText}>
          CONFIDENTIAL
        </AppText>
        
      </View>

      {/* Title */}
      <AppText variant="display" size={35} style={styles.title}>
        Just between {""}
        <AppText variant="serifItalic" size={32} style={{ color: "#E06C6C" }}>
         you two.
        </AppText>
      </AppText>

      <AppText
        variant="serifItalic"
        size={13}
        color={Colors.cream}
        style={styles.subtitle}
      >
    Photos and videos that open once, then disappear. No screenshots, no storage.
      </AppText>

      {/* Message Card */}
      <View style={styles.messageCard}>
        <View style={styles.messageHeader}>
          <View style={styles.avatar}>
            <AppText style={{ color: '#fff', fontSize: 14 }}>A</AppText>
          </View>
          <View>
            <AppText variant="mono" style={styles.fromText}>FROM AMANDA</AppText>
            <AppText variant="heading" size={17} style={{ color: '#fff' }}>
              Something just for you
            </AppText>
          </View>
        </View>

        <View style={styles.messageMeta}>
          <AppText variant="mono" style={{ color: '#8C7F75', fontSize: 12 }}>
            OPENS ONCE • 2 MIN AGO
          </AppText>
          <AppButton 
            variant="solid" 
            size="sm" 
            style={styles.openButton}
          >
            OPEN →
          </AppButton>
        </View>
      </View>

      {/* Compose Section */}
      <View style={styles.composeSection}>
        <AppText variant="smallCaps" style={styles.composeLabel}>COMPOSE</AppText>
        <Pressable style={styles.composeButton}>
          <AppText variant="heading" size={17} style={{ color: '#fff' }}>
            Send something private
          </AppText>
          <AppText style={{ color: '#E8B4A0', fontSize: 18 }}>→</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default Confidential;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -20,
    backgroundColor: "#1D1815",
    padding: 20,
    marginVertical: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
   howItWorks: {
    backgroundColor: "#F1E4DA",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  headerText: { fontSize: 10, letterSpacing: 1, color: '#AD442E' },
  tracksText: { fontSize: 10, letterSpacing: 1, color: Colors.muted },
  title: { color: "#fff", marginBottom: 4 },
  subtitle: { marginTop: -7, marginBottom: 24 },
  tracksContainer: { flex: 1 },
  trackCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#332e29",
    padding: 1,
    borderRadius: 14,
    marginBottom: 10,
  },
  confidential: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#E8B4A0',
    marginBottom: 8,
  },
 
 
  messageCard: {
    backgroundColor: '#2D1D1A',
    borderRadius: 16,
    padding: 10,
    marginBottom: 24,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E06C6C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromText: {
    fontSize: 11,
    color: '#AD442E',
    letterSpacing: 1,
  },
  messageMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#B7553E',
    paddingHorizontal: 20,
  },

  composeSection: {
    marginTop: 8,
  },
  composeLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#8C7F75',
    marginBottom: 10,
  },
  composeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E2622',
    padding: 20,
    borderRadius: 14,
  },
});