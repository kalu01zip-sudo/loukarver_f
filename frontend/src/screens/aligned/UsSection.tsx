"use client";

import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/colors";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { CountdownBlock } from "@/components/home/CountdownBlock";
import { Calendar, DateData } from "react-native-calendars";
import { AppTextInput } from "@/components/ui/AppTextInput";
import { Ionicons } from "@expo/vector-icons";

type UsTab = "TIME" | "DATES" | "REUNION";
type ActiveSheet = "startDate" | "addMarkedDay" | "reunionEdit" | null;

const formatDisplayDate = (dateString: string | null): string => {
  if (!dateString) return "mm/dd/yyyy";
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
};

const UsSection: React.FC = () => {
  const [activeUsTab, setActiveUsTab] = useState<UsTab>("TIME");
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);

  // "Add a Marked Day" sheet state
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

  const MARKS = ["◆", "○", "◉", "◇", "□", "🜂", "✦", "·"];

  return (
    <View>
      <View style={styles.headerRow}>
        <AppText
          variant="smallCaps"
          color={Colors.ink2}
          style={styles.sectionLabel}
        >
          Us
        </AppText>
        <Pressable onPress={() => setActiveSheet("startDate")}>
          <AppText variant="mono" color={Colors.accent} style={styles.editBtn}>
            EDIT
          </AppText>
        </Pressable>
      </View>

      <View style={styles.usCard}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(["TIME", "DATES", "REUNION"] as const).map((tab) => (
            <Pressable
              key={tab}
              style={styles.tab}
              onPress={() => setActiveUsTab(tab)}
            >
              <AppText
                variant="smallCaps"
                color={activeUsTab === tab ? Colors.ink : Colors.muted}
                style={{ fontSize: 12, letterSpacing: 0.5 }}
              >
                {tab}
              </AppText>
              {activeUsTab === tab && <View style={styles.tabIndicator} />}
            </Pressable>
          ))}
        </View>

        {activeUsTab === "TIME" && (
          <View style={styles.timeTab}>
            <View style={[styles.card, { marginTop: 10 }]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: 12,
                }}
              >
                <AppText variant="display" size={90} style={{ lineHeight: 80 }}>
                  {days}
                </AppText>
                <View>
                  <AppText variant="serifItalic" size={22} color={Colors.muted}>
                    days
                  </AppText>
                  <AppText variant="smallCaps" color={Colors.accent}>
                    & counting
                  </AppText>
                </View>
              </View>
              <AppText
                variant="serifItalic"
                size={15}
                color={Colors.muted}
                style={{ marginTop: 12 }}
              >
                Since{" "}
                <AppText variant="serifItalic" size={15} color={Colors.ink}>
                  November 14, 2023
                </AppText>{" "}
                — the day it all began.
              </AppText>
            </View>

            <View style={styles.milestoneRow}>
  {[
    { value: "500", label: "MILESTONE" },
    { value: "190d", label: "NEXT ANNIVERSARY" },
    { value: "30", label: "MONTHS" },
  ].map(({ value, label }, index, array) => (
    <View 
      key={label} 
      style={[
        styles.milestoneBox1,
        // Add right border only if it's NOT the last item
        index < array.length - 1 && styles.milestoneBorder
      ]}
    >
      <AppText variant="display" size={32}>
        {value}
      </AppText>
      <AppText
        variant="mono"
        color={Colors.muted}
        style={{ fontSize: 12, marginTop: 4 }}
      >
        {label}
      </AppText>
    </View>
  ))}
</View>
          </View>
        )}

        {activeUsTab === "DATES" && (
          <View style={styles.datesTab}>
            <View style={styles.dateRow}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <AppText size={18}>◈</AppText>
                <View>
                  <AppText variant="heading" size={17}>
                    First Date Anniversary
                  </AppText>
                  <AppText variant="mono" color={Colors.muted}>
                    NOVEMBER 14
                  </AppText>
                </View>
              </View>
              <AppText variant="mono" color={Colors.muted}>
                #01
              </AppText>
            </View>

            <View style={styles.dateRow}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <AppText size={18}>♦︎</AppText>
                <View>
                  <AppText variant="heading" size={17}>
                    Amanda's Birthday
                  </AppText>
                  <AppText variant="mono" color={Colors.muted}>
                    APRIL 8
                  </AppText>
                </View>
              </View>
              <AppText variant="mono" color={Colors.muted}>
                #02
              </AppText>
            </View>

            <Pressable
              style={styles.addDateButton}
              onPress={() => setActiveSheet("addMarkedDay")}
            >
              <AppText
                variant="mono"
                color={Colors.accent}
                style={{ fontSize: 10 }}
              >
                + ADD A DATE
              </AppText>
            </Pressable>
          </View>
        )}

        {activeUsTab === "REUNION" && (
          <View style={styles.reunionTab}>
            <View style={styles.card}>
              <AppText
                variant="serifItalic"
                size={15}
                color={Colors.muted}
                style={{ marginBottom: 18, lineHeight: 22 }}
              >
                Until you hold each other again, there is a quiet countdown.
              </AppText>
              <CountdownBlock targetDate={reunionDate} />
            </View>

            <View style={styles.reunionFooter}>
              <AppText
                variant="mono"
                color={Colors.muted}
                style={{ fontSize: 10 }}
              >
                {reunionDateStr} · TULUM
              </AppText>
              <Pressable onPress={() => setActiveSheet("reunionEdit")}>
                <AppText
                  variant="mono"
                  color={Colors.accent}
                  style={{ fontSize: 10 }}
                >
                  EDIT
                </AppText>
              </Pressable>
            </View>
          </View>
        )}
      </View>

      <BottomSheet
        open={activeSheet === "startDate"}
        onClose={handleCloseSheet}
        kicker="PAGE 02"
        title="Our beginning"
      >
        <View >
          <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 24 , marginTop:15,}}
          >
            When did your story begin?
          </AppText>

          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={styles.sheetLabel}
          >
            01 START DATE
          </AppText>

          <View style={styles.datePickerRow}>
            <AppText variant="display" style={{letterSpacing:1}} size={20}>
              {formatDisplayDate(startDate)}
            </AppText>
            <Pressable onPress={() => setShowStartCalendar((v) => !v)}>
              <Ionicons name="calendar-outline" size={26} color="#000" />
            </Pressable>
          </View>

          {showStartCalendar && (
            <View style={styles.calendarWrapper}>
              <Calendar
                current={startDate}
                onDayPress={handleStartDatePress}
                markedDates={
                  startDate
                    ? {
                        [startDate]: {
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

          <AppButton variant="solid" full size="lg" style={{ marginTop: 20 }}>
            SAVE →
          </AppButton>
        </View>
      </BottomSheet>

      <BottomSheet
        open={activeSheet === "addMarkedDay"}
        onClose={handleCloseSheet}
        kicker="DATES"
        title="Add a marked day"
      >
        <View style={{marginTop:8}}>
          <View>
            <AppTextInput
              label="What it is"
              n="01"
              placeholder="First Trip Together"
            />
          </View>

          {/* 02 Date */}
          <View style={{ marginBottom: 28 }}>
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={styles.sheetLabel}
            >
              02 WHEN
            </AppText>
            <View style={styles.datePickerRow}>
              <AppText
                variant="display"
                size={20}
                color={markedDayDate ? Colors.ink : Colors.muted}
              >
                {formatDisplayDate(markedDayDate)}
              </AppText>
              <Pressable onPress={() => setShowMarkedCalendar((v) => !v)}>
               <Ionicons name="calendar-outline" size={26} color="#000" />
              </Pressable>
            </View>

            {showMarkedCalendar && (
              <View style={styles.calendarWrapper}>
                <Calendar
                  onDayPress={handleMarkedDayPress}
                  markedDates={
                    markedDayDate
                      ? {
                          [markedDayDate]: {
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
          </View>

          <View>
            <AppText
              variant="smallCaps"
              color={Colors.ink2}
              style={styles.sheetLabel}
            >
              03 MARK
            </AppText>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {MARKS.map((mark) => (
                <Pressable
                  key={mark}
                  onPress={() => setSelectedMark(mark)}
                  style={[
                    styles.markBox,
                    selectedMark === mark && styles.markBoxActive,
                  ]}
                >
                  <AppText size={26}>{mark}</AppText>
                </Pressable>
              ))}
            </View>
          </View>

          <AppButton variant="solid" full size="lg" style={{ marginTop: 40 }}>
            ADD →
          </AppButton>
        </View>
      </BottomSheet>

      <BottomSheet
        open={activeSheet === "reunionEdit"}
        onClose={handleCloseSheet}
        kicker="REUNION"
        title="Next time, together"
      >
        <View >
          <AppText
            variant="serifItalic"
            size={15}
            color={Colors.muted}
            style={{ marginBottom: 24 }}
          >
            The date you'll next hold each other.
          </AppText>

          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={styles.sheetLabel}
          >
            01 REUNION DATE
          </AppText>

          <View style={styles.datePickerRow}>
            <AppText variant="display" size={32}>
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

          <AppButton variant="solid" full size="lg" style={{ marginTop: 40 }}>
            UPDATE COUNTDOWN →
          </AppButton>
        </View>
      </BottomSheet>
    </View>
  );
};

export default UsSection;

const styles = StyleSheet.create({
  sectionLabel: { marginBottom: 4, marginTop: 8 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  editBtn: { fontSize: 10 },

  usCard: {
    backgroundColor: Colors.bone,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.rule,
    overflow: "hidden",
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    
    position: "relative",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "60%",
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  timeTab: { padding: 10 },
milestoneRow: { 
  flexDirection: "row", 
  marginTop: 32,
  marginHorizontal:10
},

milestoneBox1: {
  flex: 1,
  paddingVertical: 16,
  alignItems: "center",
    borderTopWidth: 1,
  borderColor: Colors.rule,
  paddingHorizontal:10,
},

milestoneBorder: {
  borderRightWidth: 1,
  borderColor: Colors.rule,
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

  reunionTab: { padding: 24 },
  reunionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  card: {
    borderRadius: 14,

    padding: 15,

    elevation: 1,
  },


  sheetLabel: { fontSize: 12, marginBottom: 8 },
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

  markBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  markBoxActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.bone,
  },
});
