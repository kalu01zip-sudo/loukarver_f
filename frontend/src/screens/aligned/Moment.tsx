import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Calendar, DateData } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import Confidential from "./Confidential";

const Moment: React.FC = () => {
  const [thinkingSent, setThinkingSent] = useState(false);
  const [activeSheet, setActiveSheet] = useState<"watchTogether" | null>(null);
  // "Add a Marked Day" sheet state
  const formatDisplayDate = (dateString: string | null): string => {
    if (!dateString) return "mm/dd/yyyy";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };
  const [markedDayDate, setMarkedDayDate] = useState<string | null>(null);
  const [showMarkedCalendar, setShowMarkedCalendar] = useState(false);
  const [selectedMark, setSelectedMark] = useState<string | null>(null);

  // "Start Date" sheet state
  const [startDate, setStartDate] = useState<string>("2023-11-14");
  const [showStartCalendar, setShowStartCalendar] = useState(false);

  // "Reunion" sheet state
  const [reunionDateStr, setReunionDateStr] = useState<string>("2026-03-15");
  const [showReunionCalendar, setShowReunionCalendar] = useState(false);

  const reunionDate = new Date(reunionDateStr);
  const days = Math.floor(
    (Date.now() - new Date("2023-11-14").getTime()) / 86_400_000,
  );

  const handleMarkedDayPress = (day: DateData) => {
    // ✅ DateData type
    setMarkedDayDate(day.dateString);
    setShowMarkedCalendar(false);
  };

  const handleStartDatePress = (day: DateData) => {
    setStartDate(day.dateString);
    setShowStartCalendar(false);
  };

  const handleReunionDatePress = (day: DateData) => {
    setReunionDateStr(day.dateString);
    setShowReunionCalendar(false);
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
    setShowMarkedCalendar(false);
    setShowStartCalendar(false);
    setShowReunionCalendar(false);
  };

  return (
    <View>
      <AppText
        variant="smallCaps"
        color={Colors.ink2}
        style={styles.sectionLabel}
      >
        IN THIS MOMENT
      </AppText>

      <View style={styles.cardsContainer}>
        {/* Thinking of you Card */}
        <Pressable
          style={styles.card}
          onPress={() => setThinkingSent(true)}
          disabled={thinkingSent}
        >
          <View style={styles.dotContainer}>◉</View>
          <AppText variant="heading" size={18} style={{ marginTop: 8 }}>
            Thinking of you
          </AppText>
          <AppText variant="serifItalic" size={14} color={Colors.muted}>
            A silent ping 13 today
          </AppText>

          {thinkingSent && (
            <View style={styles.sentContainer}>
              <AppText
                variant="mono"
                color={Colors.accent}
                style={{ fontSize: 15 }}
              >
                SENT ✓
              </AppText>
            </View>
          )}
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => setActiveSheet("watchTogether")}
        >
          <View style={styles.dotContainer}>◐</View>
          <AppText variant="heading" size={18} style={{ marginTop: 8 }}>
            Watch together
          </AppText>
          <AppText variant="serifItalic" size={14} color={Colors.muted}>
            Sync a movie, show, or game
          </AppText>
        </Pressable>
      </View>

      <AppText
        variant="serifItalic"
        size={14}
        color={Colors.muted}
        style={styles.footerText}
      >
        Things that exist in the present — they don't get saved.
      </AppText>


<Confidential></Confidential>
      {/* ==================== WATCH TOGETHER BOTTOM SHEET ==================== */}
      <BottomSheet
        open={activeSheet === "watchTogether"}
        onClose={() => setActiveSheet(null)}
        kicker="IN SYNC"
        title="Watch together"
      >
        <View style={{ paddingBottom: 10 }}>
          <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 24, lineHeight: 22 }}
          >
            Pick what you're watching and when. We'll ping you both at the same
            moment to hit play.
          </AppText>

          {/* WHERE */}
          <View style={{ marginBottom: 28 }}>
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={{ fontSize: 10, marginBottom: 12 }}
            >
              01 WHERE
            </AppText>
            <View style={styles.platformRow}>
              {[
                { name: "NETFLIX", color: "#E50914" },
                { name: "HULU", color: "#1DB954" },
                { name: "MAX", color: "#0033A0" },
                { name: "PRIME", color: "#00A8E1" },
                { name: "APPLE TV", color: "#000000", selected: true },
                { name: "YOUTUBE", color: "#FF0000" },
              ].map((platform, i) => (
                <Pressable
                  key={i}
                  style={[
                    styles.platformBtn,
                    platform.selected && {
                      backgroundColor: platform.color,
                      borderColor: platform.color,
                    },
                  ]}
                >
                  <AppText
                    style={{
                      color: platform.selected ? "#fff" : Colors.ink,
                      fontSize: 10,
                    }}
                  >
                    {platform.name}
                  </AppText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* WHAT */}
          <View style={{ marginBottom: 5 }}>
            <AppTextInput label="What" n="01" placeholder="Severance • S2 E4" />
          </View>
          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ fontSize: 10 }}
          >
            04 TIME
          </AppText>
          <View style={styles.datePickerRow}>
            <AppText variant="display" size={16}>
              {formatDisplayDate(reunionDateStr)}
            </AppText>
            <Pressable onPress={() => setShowReunionCalendar((v) => !v)}>
              <Ionicons name="calendar-outline" size={26} color="#000" />
            </Pressable>
          </View>

          {showReunionCalendar && (
            <View style={styles.calendarWrapper}>
              <Calendar
                current={reunionDateStr}
                onDayPress={handleReunionDatePress}
                markedDates={
                  reunionDateStr
                    ? {
                        [reunionDateStr]: {
                          selected: true,
                          selectedColor: Colors.accent,
                        },
                      }
                    : {}
                }
                theme={{
                  todayTextColor: Colors.accent,
                  arrowColor: Colors.accent,
                }}
              />
            </View>
          )}

          {/* TIME */}
          <View
            style={{
              marginBottom: 32,
              paddingTop: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: Colors.rule,
            }}
          >
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={{ fontSize: 10 }}
            >
              04 TIME
            </AppText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppText variant="display" size={16}>
                09:00 PM
              </AppText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <AppText size={22}>🕒</AppText>
                <AppText variant="mono" color={Colors.muted}>
                  your local time
                </AppText>
              </View>
            </View>
          </View>

          {/* HOW IT WORKS */}
          <View style={styles.howItWorks}>
            <AppText
              variant="smallCaps"
              color={Colors.accent}
              style={{ fontSize: 12, marginBottom: 8 }}
            >
              HOW IT WORKS
            </AppText>
            <AppText
              variant="serifItalic"
              size={14}
              color={Colors.muted}
              style={{ lineHeight: 20 }}
            >
              You'll both get a notification at showtime. Hit play when the
              countdown hits zero. Watch in sync.
            </AppText>
          </View>

          <AppButton
            variant="solid"
            full
            size="lg"
            style={{ marginTop: 32, backgroundColor: "#E8D5C8" }}
          >
            SCHEDULE →
          </AppButton>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Moment;

const styles = StyleSheet.create({
  sectionLabel: {
    marginBottom: 12,
    marginTop: 20,
  },

  cardsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.cream,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: 18,
    minHeight: 138,
  },
  dotContainer: {
    height: 20,
    justifyContent: "center",
    color: Colors.accent,
    fontSize: 25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B30",
  },
  dotSent: {
    backgroundColor: Colors.accent,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  sentContainer: {
    marginTop: 12,
    alignItems: "center",
  },

  footerText: {
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  datesTab: { padding: 10 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  addDateButton: { paddingVertical: 16, alignItems: "center" },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  calendarWrapper: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rule,
    overflow: "hidden",
  },

  // Bottom Sheet Styles
  platformRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  platformBtn: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#EAE2D4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  howItWorks: {
    backgroundColor: "#F1E4DA",
    padding: 16,
    borderRadius: 12,
  },
});
