import { Tabs } from 'expo-router';
import { FileText, Home, Upload, User } from 'lucide-react-native';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: isDark ? '#60A5FA' : '#1D4ED8',
          tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
          tabBarStyle: {
            backgroundColor: isDark ? '#111827' : '#ffffff',
            borderTopWidth: 1,
            borderTopColor: isDark ? '#374151' : '#E5E7EB',
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: Platform.OS === 'android' ? 70 : 85,
            paddingBottom: Platform.OS === 'android' ? 20 : 30,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: Platform.OS === 'android' ? 0 : 5,
          },
          tabBarIconStyle: {
            marginBottom: Platform.OS === 'android' ? 5 : 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="subject"
          options={{
            title: 'Subject',
            tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
        
      </Tabs>
    </SafeAreaProvider>
  );
};

export default Layout;
