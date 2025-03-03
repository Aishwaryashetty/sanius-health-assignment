import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

import SplashScreen from '../screens/Splash/Splash';
import TabNavigation from './TabNavigation';
import MovieDetailScreen from '../screens/MovieDetail/MovieDetail';
import { color } from '../utility/constants';

// Param list for navigation stack
export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    MovieDetail: { movieId: number }
};

// Stack navigator with typed params
const Stack = createStackNavigator<RootStackParamList>();

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ backgroundColor: color.darkPurple }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: color.white }}
            text2Style={{ fontSize: 14, color: color.white }}

        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: color.red }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: color.white }}
            text2Style={{ fontSize: 14, color: color.white }}
        />
    ),
};

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
            <Toast
                config={toastConfig}
                position='bottom'
                visibilityTime={2000}
                autoHide={true}
                bottomOffset={60}
            />
        </NavigationContainer>
    );
};

export default StackNavigation;