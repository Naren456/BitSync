import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, useColorScheme, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import  supabase  from "../../supabase/config"; // your supabase client
import SubjectCard from "@/components/SubjectCard";
import { useUser } from "@/contexts/UserContext";

const SubjectsList = () => {
  const isDark = useColorScheme() === "dark";
  const { userData } = useUser();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSemester, setSelectedSemester] = useState<number | null>(
    userData?.semester ?? null
  );
  const [selectedTerm, setSelectedTerm] = useState<number | null>(
    userData?.term ?? null
  );

  const bg = isDark ? "bg-neutral-900" : "bg-gray-50";
  const mainText = isDark ? "text-white" : "text-black";
  const mutedText = isDark ? "text-gray-300" : "text-gray-600";

  // 🔹 Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses") // table name
        .select("*");    // get all columns

      if (error) {
        console.error("❌ Error fetching courses:", error.message);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };
    console.log(courses)
    fetchCourses();
  }, []);

  // 🔹 Filter courses dynamically
  const filteredCourses = courses.filter((course) => {
    return (
      (selectedSemester ? course.semester === selectedSemester : true) &&
      (selectedTerm ? course.term === selectedTerm : true)
    );
  });

  if (loading) {
    return (
      <View className={`flex-1  bg-gray-50 dark:bg-gray-900 justify-center items-center ${bg}`}>
        <ActivityIndicator size="large" color={isDark ? "white" : "black"} />
        <Text className={`${mutedText} mt-2`}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <ScrollView className={`flex-1 px-5 py-10  bg-gray-50 dark:bg-gray-900`}>
      <Text className={`text-3xl font-bold mb-6 ${mainText}`}>
        📚 Subjects
      </Text>

      {/* 🔹 Semester Filter */}
      <View className="mb-4">
        <Text className={`text-base mb-1 ${mutedText}`}>Select Semester</Text>
        <Picker
          selectedValue={selectedSemester}
          onValueChange={(val) => setSelectedSemester(val)}
          style={{ color: isDark ? "white" : "black" }}
        >
          <Picker.Item label="All Semesters" value={null} />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <Picker.Item key={sem} label={`Semester ${sem}`} value={sem} />
          ))}
        </Picker>
      </View>

      {/* 🔹 Term Filter */}
      <View className="mb-6">
        <Text className={`text-base mb-1 ${mutedText}`}>Select Term</Text>
        <Picker
          selectedValue={selectedTerm}
          onValueChange={(val) => setSelectedTerm(val)}
          style={{ color: isDark ? "white" : "black" }}
        >
          <Picker.Item label="All Terms" value={null} />
          {[1, 2].map((term) => (
            <Picker.Item key={term} label={`Term ${term}`} value={term} />
          ))}
        </Picker>
      </View>

      {/* 🔹 Filtered Results */}
      {filteredCourses.map((course) => (
        <SubjectCard
          key={course.courseNo}
          name={`${course.courseNo} - ${course.title}`}
        />
      ))}

      <View className="h-20" />
    </ScrollView>
  );
};

export default SubjectsList;
