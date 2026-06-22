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
import { AppTextInput } from "../../components/ui/AppTextInput";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { usePersist } from "../../hooks/usePersist";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import SamVibeNav from "@/components/ui/SamVibeNav";

interface UpcomingDate {
  place: string;
  date: string;
  time: string;
  meetType: "location" | "pickup" | "pickedup";
  note: string;
  confirmed: boolean;
}

const PAST = [
  {
    place: "Washington Square Park",
    time: "Last Sunday",
    note: "Coffee walk, stayed 2 hours",
    rating: 5,
  },
  {
    place: "Quality Bistro",
    time: "Oct 8",
    note: "Dinner after the museum",
    rating: 4,
  },
];

export const VCDatesScreen: React.FC = () => {
  const [upcoming, setUpcoming] = usePersist<UpcomingDate | null>(
    "vc.c1.dates.upcoming",
    {
      place: "The Fat Radish",
      date: "2026-04-25",
      time: "19:30",
      meetType: "location",
      note: "Low key dinner.",
      confirmed: true,
    },
  );

  const [sheet, setSheet] = useState(false);

  // Form States
  const [place, setPlace] = useState(upcoming?.place || "");
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 25)); // April 25
  const [selectedTime, setSelectedTime] = useState(
    new Date(2026, 3, 25, 19, 30),
  );
  const [meetType, setMeetType] = useState<"location" | "pickup" | "pickedup">(
    upcoming?.meetType || "location",
  );
  const [note, setNote] = useState(upcoming?.note || "");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatDisplayTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDateChange = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) setSelectedDate(selected);
  };

  const handleTimeChange = (_: any, selected?: Date) => {
    setShowTimePicker(false);
    if (selected) setSelectedTime(selected);
  };

  const saveDate = () => {
    const newUpcoming: UpcomingDate = {
      place: place || "Untitled Date",
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime.toTimeString().slice(0, 5),
      meetType,
      note,
      confirmed: false,
    };
    setUpcoming(newUpcoming);
    setSheet(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SamVibeNav></SamVibeNav>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <AppText
            variant="display"
            size={42}
            style={{ lineHeight: 42, marginBottom: 6 }}
          >
            Dates
            <AppText size={42} color={Colors.accent}>
              .
            </AppText>
          </AppText>
          <AppText
            variant="serifItalic"
            size={16}
            color={Colors.muted}
            style={{ lineHeight: 24, marginBottom: 24 }}
          >
            What's next between you two.
          </AppText>

          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ marginBottom: 14 }}
          >
            Next up
          </AppText>

          {upcoming ? (
            <View style={styles.upcomingCard}>
              <AppText
                variant="smallCaps"
                color={upcoming.confirmed ? Colors.accent : Colors.muted}
                style={{ marginBottom: 8 }}
              >
                {upcoming.confirmed ? "● Confirmed" : "○ Proposed"}
              </AppText>
              <AppText
                variant="display"
                size={26}
                style={{ lineHeight: 28, marginBottom: 8 }}
              >
                {upcoming.place}
              </AppText>
              <AppText
                variant="serifItalic"
                size={16}
                color={Colors.muted}
                style={{ marginBottom: 8 }}
              >
                {formatDisplayDate(new Date(upcoming.date))} · {upcoming.time}
              </AppText>
              {upcoming.note && (
                <AppText
                  variant="serifItalic"
                  size={14}
                  color={Colors.ink2}
                  style={{
                    lineHeight: 22,
                    borderTopWidth: 1,
                    borderTopColor: Colors.rule,
                    paddingTop: 12,
                    marginTop: 4,
                  }}
                >
                  "{upcoming.note}"
                </AppText>
              )}

              <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                <AppButton
                  variant="outline"
                  size="sm"
                  style={{ flex: 1 }}
                  onPress={() => setSheet(true)}
                >
                  Edit
                </AppButton>
                <AppButton
                  variant="outline"
                  size="sm"
                  style={{ flex: 1 }}
                  onPress={() => setUpcoming(null)}
                >
                  Cancel
                </AppButton>
              </View>
            </View>
          ) : (
            <AppButton
              full
              variant="outline"
              size="lg"
              onPress={() => setSheet(true)}
              style={{ marginBottom: 18 }}
            >
              + Plan something
            </AppButton>
          )}

          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ marginTop: 24, marginBottom: 14 }}
          >
            The history
          </AppText>
          {PAST.map((d, i) => (
            <View key={i} style={styles.pastCard}>
              <View>
                <AppText variant="heading" size={15}>
                  {d.place}
                </AppText>
                <AppText
                  variant="mono"
                  color={Colors.light}
                  style={{ fontSize: 9, marginTop: 2 }}
                >
                  {d.time.toUpperCase()}
                </AppText>
                <AppText
                  variant="serifItalic"
                  size={13}
                  color={Colors.muted}
                  style={{ marginTop: 4 }}
                >
                  {d.note}
                </AppText>
              </View>
              <AppText
                variant="mono"
                color={Colors.accent}
                style={{ fontSize: 11 }}
              >
                {"●".repeat(d.rating)}
                {"○".repeat(5 - d.rating)}
              </AppText>
            </View>
          ))}

          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Plan / Edit Date BottomSheet */}
      <BottomSheet
        open={sheet}
        onClose={() => setSheet(false)}
        kicker={upcoming ? "EDIT" : "NEW"}
        title={upcoming ? "Edit this date" : "Plan a date"}
      >
        <AppTextInput
          label="WHERE"
          n="01"
          value={place}
          onChangeText={setPlace}
          placeholder="The Fat Radish"
        />

        {/* Date Picker */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.rule }}>
          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ marginBottom: 8 }}
          >
            02 Date
          </AppText>
          <Pressable
            style={styles.datePickerRow}
            onPress={() => setShowDatePicker(true)}
          >
            <AppText variant="display" size={20}>
              {formatDisplayDate(selectedDate)}
            </AppText>
            <Ionicons name="calendar-outline" size={26} color="#000" />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Time Picker */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.rule,
            marginBottom: 20,
            paddingTop: 10,
          }}
        >
          <AppText
            variant="smallCaps"
            color={Colors.ink2}
            style={{ marginBottom: 8 }}
          >
            03 TIME
          </AppText>
          <Pressable
            style={styles.datePickerRow}
            onPress={() => setShowTimePicker(true)}
          >
            <AppText variant="display" size={20}>
              {formatDisplayTime(selectedTime)}
            </AppText>
            <Ionicons name="time-outline" size={26} color="#000" />
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={false}
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* How We Meet */}
        <AppText
          variant="smallCaps"
          color={Colors.ink2}
          style={{ marginBottom: 10 }}
        >
          04 HOW WE MEET
        </AppText>
        <View style={styles.meetOptions}>
          {[
            { label: "Meet at the location", value: "location" },
            { label: "I'll pick you up", value: "pickup" },
            { label: "Pick me up", value: "pickedup" },
          ].map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.meetOption,
                meetType === option.value && styles.meetSelected,
              ]}
              onPress={() => setMeetType(option.value as any)}
            >
              <AppText
              variant="mono"
                style={{
                  color: meetType === option.value ? "#fff" : Colors.ink,
                }}
              >
                {option.label}
              </AppText>
              <View
                style={[
                  styles.radio,
                  meetType === option.value && styles.radioSelected,
                ]}
              />
            </Pressable>
          ))}
        </View>

        <AppTextInput
          label="A NOTE (optional)"
          n="05"
          value={note}
          onChangeText={setNote}
          placeholder="Low key dinner..."
          multiline
        />

        <AppButton
          full
          variant="solid"
          size="lg"
          style={{ marginTop: 28 }}
          onPress={saveDate}
        >
          {upcoming ? "Update Date →" : "Propose Date →"}
        </AppButton>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bone },
  inner: { padding: 24 },
  upcomingCard: {
    borderRadius: 14,
    padding: 22,
    backgroundColor: Colors.bone,
    borderWidth: 1,
    borderColor: `${Colors.accent}30`,
    marginBottom: 8,
  },
  pastCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: Colors.bone,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.rule,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  meetOptions: {
    marginBottom: 10,
    gap: 8,
  },
  meetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EAE2D4",
    borderRadius: 12,
  },
  meetSelected: {
    backgroundColor: "#1C1C1E",
  },
  radio: {
    width: 6,
    height: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  radioSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
});
