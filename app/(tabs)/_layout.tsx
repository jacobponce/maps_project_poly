import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Colors from '@/constants/Colors';

export default function TabLayout() {

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.primary,
        headerShown: false,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="EventCalendar/calendar"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="User/user"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="EventCalendar/EventForm/NewEvent"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="EventCalendar/eventsList"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
