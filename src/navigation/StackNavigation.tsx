import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash/Splash';
import TabNavigation from './TabNavigation';
import MovieDetailScreen from '../screens/MovieDetail/MovieDetail';

// Param list for navigation stack
export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    MovieDetail: { movieId: number }
};

// Stack navigator with typed params
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={() => ({
                    headerShown: false,
                })}
            >
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />
                <Stack.Screen
                    name="Home"
                    component={TabNavigation}
                />
                <Stack.Screen
                    name="MovieDetail"
                    component={MovieDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigation;