import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home/Home';
import { color, fontSize } from '../utility/constants';

const focusedSize = 15;
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    const isFocused = navigation.isFocused();
                    let iconSize: number
                    switch (route.name) {
                        case 'Now Playing':
                            iconName = isFocused ? 'play-circle' : 'play-circle-outline';
                            iconSize = isFocused ? focusedSize : size;
                            break;
                        case 'Popular':
                            iconName = isFocused ? 'flame' : 'flame-outline';
                            iconSize = isFocused ? focusedSize : size;
                            break;
                        case 'Favourites':
                            iconName = isFocused ? 'heart' : 'heart-outline';
                            iconSize = isFocused ? focusedSize : size;
                            break;
                        case 'Top Rated':
                            iconName = isFocused ? 'star' : 'star-outline';
                            iconSize = isFocused ? focusedSize : size;
                            break;
                        case 'Upcoming':
                            iconName = isFocused ? 'calendar' : 'calendar-outline';
                            iconSize = isFocused ? focusedSize : size;
                            break;
                        default:
                            iconName = 'help-circle-outline';
                            iconSize = isFocused ? focusedSize : size;
                    }
                    return <Ionicons name={iconName} size={iconSize} color={color} />;
                },
                tabBarActiveTintColor: color.orange,
                tabBarInactiveTintColor: color.beige,
                tabBarLabelStyle: {
                    fontSize: fontSize.xs,
                    fontWeight: navigation.isFocused() ? 'bold' : 'normal',
                },
                tabBarStyle: {
                    backgroundColor: color.maroon,
                    shadowColor: color.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    height: 70,
                    justifyContent: 'center',
                    marginHorizontal: 5,
                    borderRadius: 30,
                    position: 'absolute',
                    bottom: 30,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
            })}
        >
            <Tab.Screen name="Now Playing">
                {() => <Home category="now_playing" />}
            </Tab.Screen>
            <Tab.Screen name="Popular">
                {() => <Home category="popular" />}
            </Tab.Screen>
            <Tab.Screen name="Favourites">
                {() => <Home category="favourites" />}
            </Tab.Screen>
            <Tab.Screen name="Top Rated">
                {() => <Home category="top_rated" />}
            </Tab.Screen>
            <Tab.Screen name="Upcoming">
                {() => <Home category="upcoming" />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigation;
