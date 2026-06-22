import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../constants/colors";
import { AppText } from "../../components/ui/AppText";
import { AppButton } from "../../components/ui/AppButton";
import { ThisOrThatCard } from "../../components/vibecheck/ThisOrThatCard";
import { usePersist } from "../../hooks/usePersist";
import {
  PlayHistoryEntry,
  ThisOrThatCard as TCard,
  VibeTabParamList,
} from "../../types";
import { todayIso } from "../../utils/dateUtils";
import SamVibeNav from "@/components/ui/SamVibeNav";
import { PulseScreen } from "./PulseScreen";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const TOT_CARDS: TCard[] = [
  { a: "Beach", b: "Mountains", cat: "Travel" },
  { a: "Plan everything", b: "Wing it", cat: "Style" },
  { a: "Text back fast", b: "Take your time", cat: "Comms" },
  { a: "Stay in", b: "Go out", cat: "Energy" },
  { a: "Morning person", b: "Night owl", cat: "Rhythm" },
  { a: "Big group", b: "Just us", cat: "Social" },
  { a: "Hold hands always", b: "Glance across the room", cat: "Affection" },
  { a: "Fight it out tonight", b: "Sleep on it first", cat: "Conflict" },
];

const DAILY_LIMIT = 3;

export const PlayScreen: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<VibeTabParamList>>();
  const [cardIdx, setCardIdx] = usePersist<number>("vc.c1.play.cardIdx", 0);
  const [history, setHistory] = usePersist<PlayHistoryEntry[]>(
    "vc.c1.play.history",
    [],
  );
  const [activeDays, setActiveDays] = usePersist<string[]>(
    "vc.c1.play.activeDays",
    [],
  );
  const [myPick, setMyPick] = useState<"a" | "b" | null>(null);
  const [theirPick, setTheirPick] = useState<"a" | "b" | null>(null);
  const [revealed, setRevealed] = useState(false);

  const today = todayIso();
  const cardsToday = history.filter((h) => h.at?.slice(0, 10) === today).length;
  const limitReached = cardsToday >= DAILY_LIMIT;

  const matchRate =
    history.length > 0
      ? Math.round(
          (history.filter((h) => h.myPick === h.theirPick).length /
            history.length) *
            100,
        )
      : 0;

  const streak = (() => {
    const set = new Set(activeDays);
    let c = 0;
    const d = new Date();
    if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
    while (set.has(d.toISOString().slice(0, 10))) {
      c++;
      d.setDate(d.getDate() - 1);
    }
    return c;
  })();

  const card = TOT_CARDS[cardIdx % TOT_CARDS.length];
  const matched = revealed && myPick === theirPick;

  const handlePick = (pick: "a" | "b") => {
    setMyPick(pick);
    // Simulate partner pick
    setTimeout(() => {
      const fake = Math.random() > 0.4 ? pick : pick === "a" ? "b" : "a";
      setTheirPick(fake);
      setRevealed(true);
    }, 800);
  };

  const nextCard = () => {
    if (myPick && theirPick) {
      const entry: PlayHistoryEntry = {
        card,
        myPick,
        theirPick,
        date: "Just now",
        at: new Date().toISOString(),
      };
      setHistory((p) => [entry, ...p]);
      if (!activeDays.includes(today))
        setActiveDays((p) => [today, ...p].slice(0, 365));
    }
    setCardIdx((i) => i + 1);
    setMyPick(null);
    setTheirPick(null);
    setRevealed(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SamVibeNav />
        {/* Stats strip */}
        <View style={styles.stats1}>
          <View style={styles.stats}>
            <View style={{ gap: 2 }}>
              <AppText variant="smallCaps" color={Colors.muted}>
                Streak
              </AppText>
              <AppText
                variant="display"
                size={22}
                color={Colors.ink}
                style={{ lineHeight: 22 }}
              >
                {streak}
                <AppText variant="mono" size={11} color={Colors.muted}>
                  {" "}
                  d
                </AppText>
              </AppText>
            </View>
            <View style={styles.divider} />
            <View style={{ gap: 2 }}>
              <AppText variant="smallCaps" color={Colors.muted}>
                Match
              </AppText>
              <AppText
                variant="display"
                size={22}
                color={Colors.accent}
                style={{ lineHeight: 22 }}
              >
                {matchRate}
                <AppText variant="mono" size={13} color={Colors.muted}>
                  %
                </AppText>
              </AppText>
            </View>
            <View style={styles.partnerPill}>
              <AppText
                variant="mono"
                color={Colors.accent}
                style={{ fontSize: 10 }}
              >
                ● SAM
              </AppText>
            </View>
          </View>
          {/* <View style={{backgroundColor:'#EAE2D4'}}><AppText variant="smallCaps" color={Colors.muted} >◐ 0 / 3 TODAY</AppText></View> */}
        </View>

        <View style={styles.inner}>
          {limitReached ? (
            <View style={styles.limitCard}>
              <AppText
                size={32}
                color={Colors.accent}
                style={{ marginBottom: 10 }}
              >
                ◓
              </AppText>
              <AppText
                variant="display"
                size={24}
                style={{ lineHeight: 28, marginBottom: 6 }}
              >
                That's your{" "}
                <AppText variant="serifItalic" size={24} color={Colors.accent}>
                  three
                </AppText>{" "}
                for today.
              </AppText>
              <AppText
                variant="serifItalic"
                size={14}
                color={Colors.muted}
                style={{ textAlign: "center", lineHeight: 22 }}
              >
                Come back tomorrow. The slowness is the point.
              </AppText>
            </View>
          ) : (
            <>
              {/* Prompt */}
              <View style={styles.prompt}>
                <AppText
                  variant="smallCaps"
                  color={Colors.accent}
                  style={{ marginBottom: 10 }}
                >
                  Card {cardsToday + 1} of {DAILY_LIMIT}
                </AppText>
                <AppText
                  variant="display"
                  size={32}
                  style={{ lineHeight: 32, marginBottom: 6 }}
                >
                  This or that
                  <AppText size={32} color={Colors.accent}>
                    ?
                  </AppText>
                </AppText>
                <AppText variant="serifItalic" size={14} color={Colors.muted}>
                  {card.cat} · pick the one that's more you
                </AppText>
              </View>

              {/* The card */}
              <ThisOrThatCard
                card={card}
                myPick={myPick}
                theirPick={theirPick}
                revealed={revealed}
                partnerName="Sam"
                onPick={handlePick}
              />

              {/* Status */}
              {!myPick && (
                <AppText
                  variant="serifItalic"
                  size={15}
                  color={Colors.muted}
                  style={{
                    textAlign: "center",
                    lineHeight: 22,
                    marginBottom: 24,
                  }}
                >
                  Pick to lock in.
                </AppText>
              )}
              {myPick && !revealed && (
                <AppText
                  variant="smallCaps"
                  color={Colors.accent}
                  style={{ textAlign: "center", marginBottom: 24 }}
                >
                  Waiting for reveal...
                </AppText>
              )}
              {revealed && (
                <View style={{ marginBottom: 24 }}>
                  <View
                    style={[
                      styles.resultCard,
                      matched ? styles.resultMatch : styles.resultDiffer,
                    ]}
                  >
                    <AppText
                      variant="display"
                      size={32}
                      color={matched ? Colors.sage : Colors.ink}
                      style={{ lineHeight: 36 }}
                    >
                      {matched ? (
                        <>
                          You{" "}
                          <AppText
                            variant="serifItalic"
                            size={32}
                            color={Colors.sage}
                          >
                            matched.
                          </AppText>
                        </>
                      ) : (
                        <>
                          You{" "}
                          <AppText
                            variant="serifItalic"
                            size={32}
                            color={Colors.accent}
                          >
                            differ.
                          </AppText>
                        </>
                      )}
                    </AppText>
                    <AppText
                      variant="serifItalic"
                      size={14}
                      color={Colors.muted}
                      style={{ marginTop: 6 }}
                    >
                      {matched
                        ? "Same energy."
                        : "Worth a second look — or a laugh."}
                    </AppText>
                  </View>
                  <AppButton full variant="solid" size="lg" onPress={nextCard}>
                    Next card →
                  </AppButton>
                </View>
              )}

              {/* Pulse teaser */}
              {history.length >= 4 && (
                <Pressable
                  style={styles.pulseTease}
                  onPress={() => navigation.navigate("Pulse")}
                >
                  <View style={{ flex: 1 }}>
                    <AppText
                      variant="smallCaps"
                      color={Colors.accent}
                      style={{ marginBottom: 4 }}
                    >
                      The Pulse · unlocked
                    </AppText>

                    <AppText
                      variant="heading"
                      size={16}
                      color={Colors.bone}
                      style={{ marginBottom: 2 }}
                    >
                      You're {matchRate}% in sync
                    </AppText>

                    <AppText
                      variant="serifItalic"
                      size={13}
                      color={Colors.cream2}
                    >
                      See your patterns →
                    </AppText>
                  </View>

                  <AppText size={18} color={Colors.accent}>
                    →
                  </AppText>
                </Pressable>
              )}
            </>
          )}

          <AppText
            variant="serifItalic"
            color={Colors.muted}
            style={{ textAlign: "center", marginTop: 40, fontSize: 12 }}
          >
            One card a day. Build the streak.
          </AppText>

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bone },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  stats1: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
    paddingHorizontal: 20,
  },
  divider: { width: 1, height: 30, backgroundColor: Colors.rule },
  partnerPill: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: `${Colors.accent}15`,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    backgroundColor: Colors.cream,
    alignSelf: "flex-start",
  },
  pillActive: { backgroundColor: `${Colors.accent}12` },
  inner: { padding: 24 },
  prompt: { textAlign: "center", alignItems: "center", marginBottom: 26 },
  limitCard: {
    padding: 32,
    borderRadius: 14,
    backgroundColor: Colors.cream,
    alignItems: "center",
    marginBottom: 24,
  },
  resultCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  resultMatch: { backgroundColor: `${Colors.sage}12` },
  resultDiffer: { backgroundColor: `${Colors.cream}99` },
  pulseTease: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.ink,
    borderRadius: 14,
    padding: 18,
    marginTop: 14,
    marginBottom: 30,
  },
});
