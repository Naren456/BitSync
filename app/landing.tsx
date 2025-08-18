import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const bgClass = isDark ? "bg-neutral-900" : "bg-gray-50";
  const textClass = isDark ? "text-gray-100" : "text-gray-900";
  const subtitleClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <SafeAreaView className={`flex-1 dark:bg-gray-900 bg-white-50`}>
      <StatusBar style={isDark ? "light" : "dark"} backgroundColor={isDark ? "#171717" : "#F9FAFB"} />

      <View className="flex-1 justify-center items-center px-6">
        {/* App Branding */}
        <Text className={`text-5xl font-lucide ${textClass} mb-2`}>PortSync</Text>
        <Text className={`text-lg text-center mb-10 ${subtitleClass}`}>
          Your College Assistant, Reimagined 🚀
        </Text>

        {/* Gradient Sign Up Button */}
        <TouchableOpacity
          className="w-4/5 rounded-2xl overflow-hidden mb-4 shadow-lg"
          onPress={() => router.push("/authpages/signup")}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#6366F1", "#8B5CF6"]} // indigo → violet
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="py-4"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign In Button (outlined) */}
        <TouchableOpacity
          className="w-4/5 border-2 border-indigo-600 dark:border-indigo-400 py-4 rounded-2xl"
          onPress={() => router.push("/authpages/signin")}
          activeOpacity={0.8}
        >
          <Text className="text-indigo-600 dark:text-indigo-400 text-center text-lg font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
