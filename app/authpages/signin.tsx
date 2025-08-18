import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import supabase from "../../supabase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
const SignIn = () => {
  const router = useRouter();
const scheme = useColorScheme()
const isDark = scheme=="dark"
  const bgClass = isDark ? "bg-neutral-900" : "bg-gray-50";
  const textClass = isDark ? "text-gray-100" : "text-gray-900";
  const subtitleClass = isDark ? "text-gray-400" : "text-gray-600";

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short - should be 6 chars minimum.")
      .required("Password is required"),
  });

  const handleSupabaseSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert("Sign In Failed", error.message);
        return;
      }
      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView className={`flex-1 dark:bg-gray-900 bg-gray-50 px-6`}>
     <StatusBar style={isDark ? "light" : "dark"} backgroundColor={isDark ? "#171717" :"#F9FAFB"}/>
       <View className="flex-1 justify-center items-center px-6">
              {/* App Branding */}
              <Text className={`text-5xl font-lucide ${textClass} mb-10`}>PortSync</Text>
        

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(values) => handleSupabaseSignIn(values.email, values.password)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="w-full max-w-md">
              {/* Email Input */}
              <TextInput
                className="border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-3 shadow-sm"
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text className="text-red-500 mb-2 ml-2">{errors.email}</Text>
              )}

              {/* Password Input */}
              <TextInput
                className="border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-3 shadow-sm"
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500 mb-2 ml-2">{errors.password}</Text>
              )}

              {/* Gradient Sign In Button */}
              <TouchableOpacity onPress={handleSubmit as any} className="mt-6 rounded-2xl overflow-hidden shadow-lg">
                <LinearGradient
                  colors={["#6366F1", "#8B5CF6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="py-4"
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Sign Up Redirect */}
              <TouchableOpacity
                className="mt-6"
                onPress={() => router.push("/authpages/signup")}
              >
                <Text className="text-center text-gray-600 dark:text-gray-300">
                  Don’t have an account?{" "}
                  <Text className="text-indigo-600 font-semibold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
