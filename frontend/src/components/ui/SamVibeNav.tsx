import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { AppText } from "../../components/ui/AppText";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { AppButton } from "../../components/ui/AppButton";

const SamVibeNav: React.FC = () => {
  const [settingsSheet, setSettingsSheet] = useState(false);
  const [inviteSheet, setInviteSheet] = useState(false);
  const [switchSheet, setSwitchSheet] = useState(false);

  return (
    <View>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <AppText variant="display" style={{ fontSize: 25,  }}>
          vibe check.
        </AppText>
        <Pressable onPress={() => setSettingsSheet(true)}>
          <AppText style={{ fontSize: 22 }}>⋯</AppText>
        </Pressable>
      </View>

      {/* Sam Card */}
      <Pressable style={styles.samCard} onPress={() => setSwitchSheet(true)}>
        <View style={styles.samLeft}>
          <View style={styles.avatar}>
            <AppText style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              S
            </AppText>
          </View>
          <View>
            <AppText variant="heading" size={13}>
              Sam
            </AppText>
            <AppText
              variant="mono"
              color={Colors.accent}
              style={{ fontSize: 8 }}
            >
              DAY 87 • 3D LEFT
            </AppText>
          </View>
        </View>

        <View style={styles.samRight}>
          <View style={styles.activeBadge}>
            <AppText
              variant="mono"
              style={{ fontSize: 10, color: Colors.muted }}
            >
              2 ACTIVE
            </AppText>
          </View>
        </View>
      </Pressable>

      {/* ==================== SETTINGS BOTTOMSHEET ==================== */}
      <BottomSheet
        open={settingsSheet}
        onClose={() => setSettingsSheet(false)}
        kicker="MENU"
        title="Settings"
      >
        <View>
          <View style={styles.settingCard}>
            <AppText variant="smallCaps" color={Colors.muted}>
              PLAYING AS
            </AppText>
            <AppText variant="heading" size={20}>
              You • solo
            </AppText>
          </View>

          <View style={{ marginTop: 24, gap: 8 }}>
            <AppText variant="smallCaps" color={Colors.muted}>
              Quick Actions
            </AppText>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setSettingsSheet(false);
                setInviteSheet(true);
              }}
            >
              <AppText variant="heading" size={17}>
                Invite Sam
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                Share your private link
              </AppText>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <AppText variant="heading" size={17}>
                Notifications
              </AppText>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <AppText variant="heading" size={17}>
                Privacy
              </AppText>
            </Pressable>

            <Pressable style={styles.blackCard}>
              <AppText variant="heading" size={17} color="#fff">
                Flip to aligned.
              </AppText>
              <AppText variant="mono" color="#ccc">
                The other side — for couples
              </AppText>
            </Pressable>

            <AppText variant="smallCaps" color={Colors.muted}>
              Demo Controls
            </AppText>
            <Pressable style={styles.menuItem}>
              <AppText variant="heading" size={17}>
                Reset demo data
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                Clears every saved value and reloads.
              </AppText>
            </Pressable>
          </View>
        </View>
      </BottomSheet>

      {/* ==================== INVITE SAM BOTTOMSHEET ==================== */}
      <BottomSheet
        open={inviteSheet}
        onClose={() => setInviteSheet(false)}
        kicker="INVITE"
        title="Invite Sam to play"
      >
        <View >
          <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 20, lineHeight: 22 }}
          >
            Send the link. They open it, see one card, play their first round.
            No account needed for that first card.
          </AppText>
  <AppText variant="smallCaps" color={Colors.muted}>Suggested Message</AppText>
          <View style={styles.suggestedMessage}>
            <AppText variant="serifItalic" size={15}>
              "hey — found this game thing, takes 5 seconds a day. wanna do a
              vibe check? vibe check.app/u/k7d2x"
            </AppText>
          </View>

          <AppButton
            full
            variant="solid"
            size="lg"
            style={{ marginTop: 20, backgroundColor: "#1C1C1E" }}
          >
            COPY MESSAGE
          </AppButton>

          <View style={styles.shareButtons}>
            <AppButton variant="outline" size="md" style={{ flex: 1 }}>
              iMESSAGE
            </AppButton>
            <AppButton variant="outline" size="md" style={{ flex: 1 }}>
              WHATSAPP
            </AppButton>
            <AppButton variant="outline" size="md" style={{ flex: 1 }}>
              OTHER
            </AppButton>
          </View>

          <AppText
            variant="smallCaps"
            color={Colors.accent}
            style={{ marginTop: 30, marginBottom: 8 }}
          >
            WHAT THEY'LL SEE
          </AppText>
          <AppText variant="serifItalic" size={14} color={Colors.muted}>
            A simple card. No commitment language, no relationship questions.
            Just play one round with you. They can stop after that or keep
            going.
          </AppText>
        </View>
      </BottomSheet>

      {/* ==================== SWITCH OR ADD BOTTOMSHEET ==================== */}
      <BottomSheet
        open={switchSheet}
        onClose={() => setSwitchSheet(false)}
        kicker="YOUR CONNECTIONS"
        title="Switch or add"
      >
        <View >
          <AppText
            variant="serifItalic"
            size={14}
            color={Colors.muted}
            style={{ marginBottom: 20 }}
          >
            Each connection is separate — partners don't see each other. Premium
            unlocks more.
          </AppText>

          {/* Sam */}
          <Pressable
            style={styles.connectionCardActive}
            onPress={() => setSwitchSheet(false)}
          >
            <View style={styles.avatarBig}>
              <AppText style={{ color: "#fff", fontSize: 24 }}>S</AppText>
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="heading" size={18} color={Colors.white}>
                Sam
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                DAY 87 • MATCH 82% • 3D LEFT
              </AppText>
            </View>
            <View style={styles.activeTag}>
              <AppText variant="mono" style={{ color: "#fff", fontSize: 12 }}>
                ACTIVE
              </AppText>
            </View>
          </Pressable>

          {/* Alex */}
          <Pressable style={styles.connectionCard}>
            <View style={[styles.avatarBig, { backgroundColor: "#e8b4b4af" }]}>
              <AppText style={{ color: "#fff", fontSize: 24 }}>A</AppText>
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="heading" size={18}>
                Alex
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                DAY 12 • MATCH 54% • 78D LEFT
              </AppText>
            </View>
          </Pressable>

          <Pressable style={styles.addConnection}   onPress={() => {
                setSwitchSheet(false);
                setInviteSheet(true);
              }}>
            <AppText
              variant="mono"
              color={Colors.accent}
              style={{ fontSize: 10
               }}
            >
              + ADD A CONNECTION
            </AppText>
            <AppText
              variant="mono"
              color={Colors.muted}
              style={{ fontSize: 10 }}
            >
              $5/mo per extra connection
            </AppText>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

export default SamVibeNav;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 1,
     borderBottomWidth:1,
   borderBottomColor: Colors.rule,
  },
  samCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:13,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
    marginBottom: 20,
   paddingVertical:9,
    
  },
  samLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 999,
    backgroundColor:'#EAE2D4',
    padding:5,
    borderWidth: 1,
    borderColor: Colors.rule,
    paddingRight:20,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  samRight: {
    alignItems: "flex-end",
  },
  activeBadge: {
    
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  settingCard: {
    backgroundColor: "#EAE2D4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  menuItem: {
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: 12,
    marginBottom: 8,
  },
  blackCard: {
    backgroundColor: "#1C1C1E",
    padding: 18,
    borderRadius: 12,
    marginVertical: 8,
  },

  // Invite Sheet Styles
  suggestedMessage: {
    backgroundColor: "#EAE2D4",
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: 16,
    borderRadius: 12,
    marginTop:7,
    marginBottom: 10,
  },
  shareButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  // Switch Sheet Styles
  connectionCardActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  connectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7DFD2",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  avatarBig: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#C44D4D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  activeTag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  addConnection: {
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: 12,
    backgroundColor:'#EAE2D4'
  },
});
