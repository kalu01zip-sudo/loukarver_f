import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import { ModeSelector } from '../screens/ModeSelector';
import { Welcome } from '../screens/Welcome';
import { Onboarding } from '../screens/Onboarding';
import { AlignedTabs } from './AlignedTabs';
import { VCWelcome } from '../screens/vibecheck/VCWelcome';
import { VCOnboarding } from '../screens/vibecheck/VCOnboarding';
import { VibeTabs } from './VibeTabs';
import Login from '@/screens/Login';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: true }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ModeSelector" component={ModeSelector} />
        <Stack.Screen name="AlignedWelcome" component={Welcome} />
        <Stack.Screen name="AlignedOnboarding" component={Onboarding} />
        <Stack.Screen name="AlignedApp" component={AlignedTabs} />
        <Stack.Screen name="VibeWelcome" component={VCWelcome} />
        <Stack.Screen name="VibeOnboarding" component={VCOnboarding} />
        <Stack.Screen name="VibeApp" component={VibeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}