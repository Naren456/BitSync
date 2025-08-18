import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../contexts/UserContext"; // ✅ Import context
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const terms = [1, 2];
const cohorts = [4, 6];

const SignUp = () => {
  const router = useRouter();
  const { signUp } = useUser(); // ✅ use signUp from context
   const scheme = useColorScheme()
   const isDark = scheme=="dark"
     const bgClass = isDark ? "bg-neutral-900" : "bg-gray-50";
     const textClass = isDark ? "text-gray-100" : "text-gray-900";
     const subtitleClass = isDark ? "text-gray-400" : "text-gray-600";
   
  const [semester, setSemester] = useState<number | null>(null);
  const [term, setTerm] = useState<number | null>(null);
  const [cohort, setCohort] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"semester" | "term" | "cohort" | null>(null);

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignUp = async (values: any) => {
    if (semester === null || term === null || cohort === null) {
      Alert.alert("Missing Info", "Please select semester, term, and cohort");
      return;
    }

    const { success, error } = await signUp(
      values.email,
      values.password,
      values.name,
      semester,
      term,
      cohort
    );

    if (!success) {
      Alert.alert("Sign Up Failed", error);
      return;
    }

    Alert.alert("Success", "Account created successfully! Please check your email.");
    router.replace("/home");
  };

  // Dropdown component
  const Dropdown = ({
    label,
    value,
    data,
    onSelect,
  }: {
    label: string;
    value: number | null;
    data: number[];
    onSelect: (val: number) => void;
  }) => (
    <View className="mb-4">
      <Text className="text-gray-500 dark:text-gray-300 mb-1 font-semibold">{label}</Text>
      <TouchableOpacity
        onPress={() => setOpenDropdown(label.toLowerCase() as any)}
        className="border border-gray-300 dark:border-gray-700 rounded-full px-4 py-4 bg-white dark:bg-gray-800 shadow-sm"
      >
        <Text className="text-gray-900 dark:text-white text-base">
          {value ? `${label} ${value}` : `Select ${label}`}
        </Text>
      </TouchableOpacity>

      <Modal visible={openDropdown === label.toLowerCase()} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 max-h-1/2 shadow-lg">
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {`Select ${label}`}
            </Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setOpenDropdown(null);
                  }}
                  className="py-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <Text className="text-gray-900 dark:text-white text-base">{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setOpenDropdown(null)}
              className="mt-4 py-3 rounded-full bg-red-500"
            >
              <Text className="text-center text-white font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
     <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900 px-6 pt-12">
      {/* Title */}
      <Text className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Create Account
      </Text>

      {/* Form */}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {["Name", "Email", "Password"].map((field, idx) => (
              <View key={idx} className="mb-4">
                <TextInput
                  className="border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-800 shadow-md text-gray-900 dark:text-white text-base"
                  placeholder={field}
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={field === "Password"}
                  keyboardType={field === "Email" ? "email-address" : "default"}
                  autoCapitalize={field === "Email" ? "none" : "sentences"}
                  onChangeText={handleChange(field.toLowerCase())}
                  onBlur={handleBlur(field.toLowerCase())}
                  value={values[field.toLowerCase() as keyof typeof values]}
                />
                {errors[field.toLowerCase() as keyof typeof values] &&
                  touched[field.toLowerCase() as keyof typeof values] && (
                    <Text className="text-red-500 mt-1 ml-3">
                      {errors[field.toLowerCase() as keyof typeof values]}
                    </Text>
                  )}
              </View>
            ))}

            {/* Dropdowns */}
            <Dropdown label="Semester" value={semester} data={semesters} onSelect={setSemester} />
            <Dropdown label="Term" value={term} data={terms} onSelect={setTerm} />
            <Dropdown label="Cohort" value={cohort} data={cohorts} onSelect={setCohort} />

            {/* Gradient Button */}
            <TouchableOpacity
              onPress={handleSubmit as any}
              activeOpacity={0.85}
            className="w-full mt-8 rounded-2xl overflow-hidden mb-4 shadow-lg"
            > 
              
              <LinearGradient
                  colors={["#6366F1", "#8B5CF6"]} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className=" py-4  flex items-center justify-center"
              >
                <Text className="text-white font-bold text-lg ">Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

           
          </>
        )}
      </Formik>

      {/* Footer */}
      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-500 dark:text-gray-400 mr-1">Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace("/authpages/signin")}>
          <Text className="text-blue-600 dark:text-blue-400 font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
   
   </SafeAreaView>
  );
};

export default SignUp;
