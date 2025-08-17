import React from "react";
import { View, Text, ActivityIndicator, useColorScheme } from "react-native";
import { useUser } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, userData, loading } = useUser();
  const colorScheme = useColorScheme(); // Detect system theme (light/dark)
  const isDark = colorScheme === "dark";

  if (loading) return <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} className="flex-1" />;

  if (!user)
    return (
      <Text className="text-center text-red-500 mt-10 text-lg">
        ⚠️ Please log in
      </Text>
    );

  return (
    <SafeAreaView className={`flex-1 p-5 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <Text className={`text-2xl font-bold text-center mb-6 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
        My Profile
      </Text>

      {/* Card: Name */}
      <View className={`p-4 mb-4 rounded-2xl shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <Text className="text-gray-400 text-sm">👤 Name</Text>
        <Text className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {userData?.name}
        </Text>
      </View>

      {/* Card: Email */}
      <View className={`p-4 mb-4 rounded-2xl shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <Text className="text-gray-400 text-sm">📧 Email</Text>
        <Text className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {userData?.email}
        </Text>
      </View>

      {/* Card: Semester */}
      <View className={`p-4 mb-4 rounded-2xl shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <Text className="text-gray-400 text-sm">📚 Semester</Text>
        <Text className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {userData?.semester}
        </Text>
      </View>

      {/* Card: Term */}
      <View className={`p-4 mb-4 rounded-2xl shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <Text className="text-gray-400 text-sm">🗓️ Term</Text>
        <Text className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {userData?.term}
        </Text>
      </View>

      {/* Card: Cohort */}
      <View className={`p-4 mb-4 rounded-2xl shadow ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <Text className="text-gray-400 text-sm">👥 Cohort</Text>
        <Text className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
          {userData?.cohort}
        </Text>
      </View>
    </SafeAreaView>
  );
}
