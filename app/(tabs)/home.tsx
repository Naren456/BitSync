// app/(tabs)/home.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ChevronDown, ChevronRight, BookOpen, Loader2 } from "lucide-react-native";
import AssignmentCard from "@/components/AssignmentCard";
import { parseICS, Assignment } from "@/utils/icsParser";
import { useUser } from "../../contexts/UserContext"; // ✅ get cohort from context
import { useRouter } from "expo-router";

type GroupedAssignments = Record<string, Assignment[]>;

export default function Home() {

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [Loading,setLoading] = useState(false)
  const { userData, isLoggedIn, loading } = useUser();
  const router = useRouter();

  // 🚫 Redirect if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/landing");
    }
  }, [loading, isLoggedIn]);


  useEffect(() => {
    const loadICS = async () => {
      if (!userData?.cohort) return;
      try {
        setLoading(true);

        const fetchedAssignments = await parseICS(userData?.cohort);
        setAssignments(fetchedAssignments);
      } catch (err) {
        console.error("Error loading ICS:", err);
      } finally {
        setLoading(false);
      }
    };

    loadICS();
  }, [userData?.cohort]);

  // Classify assignments into Upcoming, Overdue, Previous
  const classifyAssignments = (assignments: Assignment[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming: Assignment[] = [];
    const overdue: Assignment[] = [];
    const previous: Assignment[] = [];

    assignments.forEach((a) => {
      const dueDateTime = new Date(`${a.dueDate}T${a.Time}:00`);
      const dueDateOnly = new Date(a.dueDate);
      dueDateOnly.setHours(0, 0, 0, 0);

      if (dueDateOnly.getTime() === today.getTime()) {
        dueDateTime < new Date() ? overdue.push(a) : upcoming.push(a);
      } else if (dueDateOnly > today) {
        upcoming.push(a);
      } else {
        previous.push(a);
      }
    });

    return { upcoming, overdue, previous };
  };

  const groupByDate = (assignments: Assignment[]): GroupedAssignments => {
    return assignments.reduce((acc, a) => {
      if (!acc[a.dueDate]) acc[a.dueDate] = [];
      acc[a.dueDate].push(a);
      return acc;
    }, {} as GroupedAssignments);
  };

  const { upcoming, overdue, previous } = classifyAssignments(assignments);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-black px-4 pt-10">
      <Text className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Deadlines
      </Text>

      {Loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="mt-3 text-gray-500 dark:text-gray-400 text-base">
            Fetching assignments...
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <CollapsibleSection
            title="📅 Upcoming"
            grouped={groupByDate(upcoming)}
            defaultOpen
          />
          <CollapsibleSection title="⚠️ Overdue" grouped={groupByDate(overdue)} />
          <CollapsibleSection title="✅ Previous" grouped={groupByDate(previous)} />

          {assignments.length === 0 && (
            <View className="items-center py-20">
              <BookOpen size={56} color="#9CA3AF" />
              <Text className="text-lg font-medium mt-5 text-gray-600 dark:text-gray-300">
                No assignments yet
              </Text>
              <Text className="text-sm mt-2 text-center text-gray-500 dark:text-gray-400 px-6">
                No deadlines found for your cohort.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const CollapsibleSection = ({
  title,
  grouped,
  defaultOpen = false,
}: {
  title: string;
  grouped: GroupedAssignments;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View className="mb-5">
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="flex-row items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl shadow"
      >
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {title} ({Object.keys(grouped).length})
        </Text>
        {open ? <ChevronDown color="#6B7280" /> : <ChevronRight color="#6B7280" />}
      </TouchableOpacity>

      {open &&
        Object.entries(grouped).map(([date, items]) => (
          <View key={date} className="mt-3">
            <Text className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">
              {date}
            </Text>
            <View className="space-y-3">
              {items.map((item) => (
                <AssignmentCard
                  key={item.id}
                  title={item.title}
                  subject={item.subject}
                  dueDate={`${item.dueDate} at ${item.Time}`}
                  link={item.link}
                />
              ))}
            </View>
          </View>
        ))}
    </View>
  );
};
