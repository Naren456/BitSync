import { Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SubjectDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900 px-5">
      <StatusBar style="auto" />

      <Text className="text-2xl font-bold text-black dark:text-white">
        📘 Subject: {id}
      </Text>

      <Text className="text-lg mt-3 text-gray-500 dark:text-gray-300 text-center">
        Detailed notes and resources for <Text className="font-semibold">{id}</Text> are coming soon.
      </Text>
    </View>
  );
};

export default SubjectDetail;
