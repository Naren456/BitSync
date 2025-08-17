import { CalendarDays, ChevronRight, Clock } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';

interface AssignmentCardProps {
  title: string;
  subject: string;
  dueDate: string;
  link :string;
  onPress?: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ title, subject, dueDate,link, onPress }) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const bgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-100';
  const titleClass = isDarkMode ? 'text-white' : 'text-gray-800';
  const subjectClass = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const dateClass = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const iconColor = isDarkMode ? '#d1d5db' : '#4b5563';
  const chevronColor = isDarkMode ? '#9CA3AF' : '#6B7280';

  // Parse due date to check if it's urgent (within 2 days)
  const isUrgent = () => {
    const today = new Date();
    const due = new Date(dueDate.split(' at')[0] || dueDate.split(' ')[0] + ' ' + dueDate.split(' ')[1] + ' ' + dueDate.split(' ')[2]);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  const urgentBorder = isUrgent() ? (isDarkMode ? 'border-red-600' : 'border-red-400') : borderClass;
  const urgentAccent = isUrgent() ? 'bg-red-500' : 'bg-blue-500';

  const CardContent = (
    <View className={`rounded-2xl shadow-md p-5 mb-4 border-2 ${bgClass} ${urgentBorder} relative overflow-hidden`}>
      {/* Urgent indicator */}
      {isUrgent() && (
        <View className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-red-500`} />
      )}
      
      {/* Subject badge */}
      <View className={`self-start px-3 py-1 rounded-full mb-3 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
        <Text className={`text-xs font-medium ${subjectClass}`}>{subject}</Text>
      </View>

      {/* Title */}
      <Text className={`text-lg font-semibold mb-3 ${titleClass} leading-6`}>{title}</Text>

      {/* Due Date */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <CalendarDays size={16} color={iconColor} />
          <Text className={`ml-2 text-sm ${dateClass}`}>Due: {dueDate}</Text>
        </View>
        
        {onPress && (
          <ChevronRight size={18} color={chevronColor} />
        )}
      </View>

      {/* Urgent indicator text */}
      {isUrgent() && (
        <View className="flex-row items-center mt-2">
          <Clock size={14} color="#EF4444" />
          <Text className="ml-1 text-xs text-red-500 font-medium">Due Soon!</Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};

export default AssignmentCard;
