import React, { useEffect, useState } from "react";
import { Image, Text, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigation";
import { LinearGradient } from 'expo-linear-gradient';

import styles from "./Styles";
import { color, images } from "../../utility/constants";

export default function Splash() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showLoading, setShowLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity 0
    const [scaleAnim] = useState(new Animated.Value(0)); // Initial scale 0

    useEffect(() => {
        // Animation sequence
        Animated.parallel([

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),

            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        const timeoutId = setTimeout(() => {
            setShowLoading(false);
            navigation.replace('Home');
        }, 3000);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            fadeAnim.setValue(0);
            scaleAnim.setValue(0);
        };
    }, [navigation, fadeAnim, scaleAnim]);

    return (
        <LinearGradient
            colors={[color.maroon, color.darkPurple]}
            style={styles.container}
        >
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.title}>
                    Sanius Health Assignment
                </Text>
            </Animated.View>
            {showLoading && (
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Image
                        source={images.splashGif}
                        style={styles.loadingGif}
                        resizeMode="contain"
                    />
                </Animated.View>
            )}
        </LinearGradient>
    );
}