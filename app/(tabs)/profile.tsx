import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { userData, loading, signOut } = useUser();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
      </View>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.replace("/landing");
  };

  return (
    <SafeAreaView className={`flex-1 p-5  bg-gray-50 dark:bg-gray-900`}>
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

      {/* 🔒 Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="mt-10 bg-red-600 py-4 rounded-2xl"
        activeOpacity={0.85}
      >
        <Text className="text-white text-center font-semibold text-lg">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
