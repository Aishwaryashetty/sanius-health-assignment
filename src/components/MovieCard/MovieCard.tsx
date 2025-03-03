import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './Styles';
import { color } from '../../utility/constants';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

interface MovieCardProps {
    movie: Movie;
    imageLoaded: boolean;
    fadeAnim: Animated.Value;
    onImageLoad: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, imageLoaded, fadeAnim, onImageLoad }) => {
    const navigation = useNavigation();
    // Determine image source based on availability of poster_path
    const imageSource = movie.poster_path
        ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
        : require('../../assets/no_poster.png');

    // Render star rating based on vote_average (converted from 0-10 to 0-5 stars)
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1 ? 1 : 0;

        return (
            <View style={{ flexDirection: 'row' }}>
                {Array(fullStars).fill(null).map((_, i) => (
                    <FontAwesome key={`full-${i}`} name="star" size={16} color={color.orange} />
                ))}
                {halfStar === 1 && <FontAwesome key="half" name="star-half" size={16} color={color.orange} />}
            </View>
        );
    };

    return (
        <TouchableOpacity
            style={styles.movieCard}
            onPress={() => navigation.getParent()?.navigate('MovieDetail', { movieId: movie.id })}
        >
            <View style={styles.movieHeader}>
                <View style={styles.posterCard}>
                    {!imageLoaded && (
                        <View style={styles.placeholder}>
                            <ActivityIndicator size="small" color={color.white} />
                        </View>
                    )}
                    <Animated.Image
                        source={imageSource}
                        style={[styles.poster, { opacity: fadeAnim }]}
                        resizeMode="cover"
                        onLoad={() => onImageLoad(movie.id)}
                        onError={() => onImageLoad(movie.id)}
                    />
                </View>
                <View style={styles.movieInfo}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
                    <View style={styles.ratingContainer}>
                        {renderStars(movie.vote_average)}
                        <Text style={styles.rating}> {movie.vote_average.toFixed(1)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MovieCard;