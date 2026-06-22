import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { BottomSheet } from "@/components/ui/BottomSheet";

const Rhythms: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<
    "herRhythm" | "yourState" | null
  >(null);

  return (
    <View>
      <AppText
        variant="smallCaps"
        color={Colors.ink2}
        style={styles.sectionLabel}
      >
        RHYTHMS
      </AppText>

      {/* Main Rhythms Card */}
      <Pressable
        style={styles.rhythmsCard}
        onPress={() => setActiveSheet("herRhythm")}
      >
        <View style={styles.topRow}>
          <View style={styles.circle}>
            <AppText style={{ fontSize: 15 }}>◊</AppText>
          </View>
          <View>
            <AppText
              variant="mono"
              color={Colors.accent}
              style={{ fontSize: 10 }}
            >
              AMANDA • FOLLICULAR • DAY 9
            </AppText>
            <AppText
              variant="heading"
              size={17}
              style={{ marginTop: 5, lineHeight: 24 }}
            >
              Tender today. More sensitive than usual.{"\n"}If I go quiet, it
              isn't you.
            </AppText>

            <AppText
              variant="mono"
              color={Colors.muted}
              style={{ fontSize: 10, marginTop: 10 }}
            >
              TAP FOR CONTEXT
            </AppText>
          </View>
        </View>

        <View style={styles.divider} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <AppText
              variant="smallCaps"
              color={Colors.muted}
              style={{ fontSize: 12 }}
            >
              YOUR STATE • TODAY
            </AppText>
            <AppText variant="heading" size={17} style={{ marginTop: 4 }}>
              Update your energy, sleep, stress
            </AppText>
            <AppText
              variant="serifItalic"
              size={14}
              color={Colors.muted}
              style={{ marginTop: 3 }}
            >
              Share the physiology behind the day.
            </AppText>
          </View>
          <Pressable onPress={() => setActiveSheet("yourState")}>
            <AppText style={{ fontSize: 24 }}>→</AppText>
          </Pressable>
        </View>
      </Pressable>

      <AppText
        variant="serifItalic"
        color={Colors.muted}
        style={{ textAlign: "center", marginTop: 40, fontSize: 12 }}
      >
        Published daily, for two.
      </AppText>

      {/* ==================== BOTTOM SHEETS ==================== */}

      {/* Her Rhythm, Right Now */}
      <BottomSheet
        open={activeSheet === "herRhythm"}
        onClose={() => setActiveSheet(null)}
        kicker="AMANDA • SHARED WITH YOU"
        title="Her rhythm, right now"
      >
        <View style={{ paddingBottom: 30 }}>
           <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 20, lineHeight: 22 }}
          >
            Amanda chose to share this so you have context — not so you have to fix anything. Just hold it with her.
          </AppText>
          <View style={styles.phaseRow}>
            <View style={{ flex: 1 }}>
              <View>
                <AppText
                  variant="mono"
                  color={Colors.accent}
                  style={{ fontSize: 10 }}
                >
                  CURRENT PHASE · DAY 9 OF CYCLE
                </AppText>
                <AppText variant="mono" style={{ fontSize: 25 }}>
                  Follicular.
                </AppText>
              </View>
              <AppText
                variant="mono"
                color={Colors.muted}
                style={{ fontSize: 10, marginTop: 7 }}
              >
                DAYS 6–13 · ESTROGEN RISING
              </AppText>
              <AppText
                variant="serifItalic"
                size={16}
                style={{ lineHeight: 24 }}
              >
                FSH drives follicle development and estrogen climbs steadily.
                Energy, mood, and openness tend to rise. A natural window for
                bigger plans and deeper connection.
              </AppText>
            </View>
          </View>
          <View style={styles.sheetCard}>
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={{ fontSize: 12, marginBottom: 8 }}
            >
              • IN HER WORDS
            </AppText>
            <AppText variant="serifItalic" size={16} style={{ lineHeight: 24 }}>
              "Tender today. More sensitive than usual. If I go quiet, it isn't
              you."
            </AppText>
            <AppText
              variant="mono"
              color={Colors.muted}
              style={{ fontSize: 9, marginTop: 12 }}
            >
              UPDATED 5 HOURS AGO
            </AppText>
          </View>

          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ marginTop: 32, marginBottom: 16, fontSize: 10 }}
          >
            THE FULL CYCLE
          </AppText>

          {/* Cycle Phases */}
          {[
            {
              phase: "Menstrual",
              days: "Days 1-5",
              desc: "Estrogen and progesterone at their lowest. The uterus sheds. Energy often low; body in reset.",
              active: false,
            },
            {
              phase: "Follicular",
              days: "Days 6-13",
              desc: "FSH drives follicle development. Estrogen climbs. Energy, mood, and openness usually rise.",
              active: true,
            },
            {
              phase: "Ovulatory",
              days: "Days 14-16",
              desc: "LH surge releases a mature egg. Estrogen peaks. Often the most expressive, social, confident window.",
              active: false,
            },
            {
              phase: "Luteal",
              days: "Days 17-28",
              desc: "Progesterone dominant. Body preparing for possible implantation. Later days can feel inward, more sensitive.",
              active: false,
            },
          ].map((item, i) => (
            <View
              key={i}
              style={[styles.phaseRow, item.active && styles.activePhase]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText
                    variant="heading"
                    size={13}
                    color={item.active ? "#fff" : Colors.ink}
                  >
                    {item.phase}
                  </AppText>
                  <AppText
                    variant="mono"
                    color={item.active ? "#ddd" : Colors.muted}
                    style={{ fontSize: 10 }}
                  >
                    {item.days}
                  </AppText>
                </View>
                <AppText
                  variant="serifItalic"
                  size={14}
                  color={item.active ? "#ddd" : Colors.muted}
                  style={{ marginTop: 6, lineHeight: 20 }}
                >
                  {item.desc}
                </AppText>
              </View>
            </View>
          ))}

          <Pressable style={styles.updateCycle}>
            <AppText
              variant="mono"
              color={Colors.accent}
              style={{ fontSize: 10 }}
            >
              ♦ UPDATE CYCLE DATES
            </AppText>
          </Pressable>

          <AppText
            variant="heading"
            color={Colors.muted}
            style={{ textAlign: "center", marginTop: 20, fontSize: 13 }}
          >
            Amanda controls what's shown here. She can turn it off anytime.
          </AppText>
        </View>
      </BottomSheet>

      {/* Where you are today */}
      <BottomSheet
        open={activeSheet === "yourState"}
        onClose={() => setActiveSheet(null)}
        kicker="YOUR STATE • TODAY"
        title="Where you are today"
      >
        <View style={{  paddingBottom: 30 }}>
          <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 20, lineHeight: 22 }}
          >
            Sleep debt and stress load measurably shift both. This is an honest
            signal, not a performance number.
          </AppText>

          {/* Energy */}
          <View style={{ marginBottom: 24 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText variant="smallCaps" color={Colors.ink2}>
                ENERGY
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                T / CORTISOL STATE
              </AppText>
            </View>
            <View style={styles.optionRow}>
              {["DRAINED", "FLAT", "STEADY", "ON", "LIT"].map((label, i) => (
                <Pressable
                  key={i}
                  style={[styles.optionBtn, i === 2 && styles.selectedOption]}
                >
                  <AppText
                    style={{
                      color: i === 2 ? "#fff" : Colors.ink,
                      fontSize: 13,
                    }}
                  >
                    {label}
                  </AppText>
                </Pressable>
              ))}
            </View>
            <AppText variant="serifItalic" size={13} color={Colors.muted}>
              Steady — normal range. Holding well.
            </AppText>
          </View>

          {/* Sleep */}
          <View style={{ marginBottom: 24 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText variant="smallCaps" color={Colors.ink2}>
                SLEEP
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                RECOVERY STATE
              </AppText>
            </View>
            <View style={styles.optionRow}>
              {["DEPLETED", "UNDER-SLEPT", "ADEQUATE", "RESTED"].map(
                (label, i) => (
                  <Pressable
                    key={i}
                    style={[
                      styles.optionBtn,
                      i === 1 && styles.selectedOptionGreen,
                    ]}
                  >
                    <AppText
                      style={{
                        color: i === 1 ? "#fff" : Colors.ink,
                        fontSize: 13,
                      }}
                    >
                      {label}
                    </AppText>
                  </Pressable>
                ),
              )}
            </View>
            <AppText variant="serifItalic" size={13} color={Colors.muted}>
              Under-slept — one rough night. Recoverable.
            </AppText>
          </View>

          {/* Stress Load */}
          <View style={{ marginBottom: 32 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <AppText variant="smallCaps" color={Colors.ink2}>
                STRESS LOAD
              </AppText>
              <AppText variant="mono" color={Colors.muted}>
                CORTISOL DEMAND
              </AppText>
            </View>
            <View style={styles.optionRow}>
              {["LIGHT", "MODERATE", "HEAVY", "MAX"].map((label, i) => (
                <Pressable
                  key={i}
                  style={[
                    styles.optionBtn,
                    i === 2 && styles.selectedOptionBrown,
                  ]}
                >
                  <AppText
                    style={{
                      color: i === 2 ? "#fff" : Colors.ink,
                      fontSize: 13,
                    }}
                  >
                    {label}
                  </AppText>
                </Pressable>
              ))}
            </View>
            <AppText variant="serifItalic" size={13} color={Colors.muted}>
              Heavy — elevated load. Shorter patience expected.
            </AppText>
          </View>

          {/* In your words */}
          <View style={{ marginBottom: 24 }}>
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={{ marginBottom: 8 }}
            >
              04 IN YOUR WORDS (OPTIONAL)
            </AppText>
            <View style={styles.inputBox}>
              <AppText variant="serifItalic" size={15} color={Colors.muted}>
                Didn't sleep well. Work heavy. Not short with you — just running
                on fumes.
              </AppText>
            </View>
          </View>

          {/* Share toggle */}
          <View style={styles.shareRow}>
            <View style={{ flex: 1 }}>
              <AppText variant="heading" size={16}>
                Share with Amanda
              </AppText>
              <AppText
                variant="mono"
                color={Colors.muted}
                style={{ fontSize: 12 }}
              >
                She'll see this on her Today. You can turn it off anytime.
              </AppText>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleCircle} />
            </View>
          </View>

          <AppButton variant="solid" full size="lg" style={{ marginTop: 32 }}>
            SAVE FOR TODAY →
          </AppButton>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Rhythms;

const styles = StyleSheet.create({
  sectionLabel: { marginBottom: 12, marginTop: 8 },

  rhythmsCard: {
    backgroundColor: Colors.bone,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: 20,
  },
  topRow: {
    flexDirection: "row",

    gap: 10,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: "#ff4f280e",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.rule,
    marginVertical: 16,
  },

  sheetCard: {
    borderWidth: 1,
    borderColor: Colors.rule,
    borderRadius: 12,
    padding: 16,
  },

  phaseRow: {
    padding: 16,
    backgroundColor: Colors.cream,
    borderRadius: 12,
    marginBottom: 8,
  },
  activePhase: {
    backgroundColor: "#1C1C1E",
  },

  updateCycle: {
    paddingVertical: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 7,
    borderColor: Colors.rule,
  },

  optionRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 10,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: Colors.cream,
    borderRadius: 10,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#C44D4D",
  },
  selectedOptionGreen: {
    backgroundColor: Colors.sage,
  },
  selectedOptionBrown: {
    backgroundColor: "#D4A574",
  },

  inputBox: {
    borderBottomWidth:1,
    borderColor:Colors.rule,
  
    paddingVertical:4,
    minHeight: 80,
  },

  shareRow: {
    flexDirection: "row",
    alignItems: "center",
  backgroundColor: Colors.cream,
    padding: 16,
    borderRadius: 12,
  },
  toggle: {
    width: 50,
    height: 28,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
