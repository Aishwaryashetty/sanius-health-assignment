import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { getMovieDetails, getFavorite, addToFavorite } from '../../services/TMDBServices';

import styles from './Styles';
import { color, images } from '../../utility/constants';
interface MovieDetailsProps {
    route: any;
}
interface Movie {
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

export default function MovieDetails({ route }: MovieDetailsProps) {

    const { movieId } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch movie details from TMDB API
                const data = await getMovieDetails(movieId);
                setMovie(data);
                // Check if movie is already a favorite
                const favoritesData = await getFavorite();
                const isAlreadyFavorite = favoritesData.results.some(
                    (fav: { id: number }) => fav.id === parseInt(movieId)
                );
                setIsFavorite(isAlreadyFavorite);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetching movie details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    // Toggle movie favorite status
    const toggleFavorite = async () => {
        try {
            await addToFavorite(movieId, !isFavorite);
            setIsFavorite(!isFavorite);
        } catch (error) {
            Alert.alert('Error', 'Failed to add this Movie Favorites. Please try again.');
        }
    };

    // Render loading state
    if (loading) {
        return <View style={styles.loadingCenter}>
            <Image
                source={images.loadingGif}
                style={styles.loadingGif}
            />
        </View>
    }

    // Render error state if movie data is not available
    if (!movie) {
        return <Text>Movie not found.</Text>;
    }

    // Render star rating based on vote_average (out of 10, converted to 5 stars)
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating / 2); // Convert 0-10 rating to 0-5 stars
        const halfStar = rating % 2 >= 1 ? 1 : 0; // Check for half star

        return (
            <Text style={{ flexDirection: 'row' }}>
                {Array(fullStars).fill(null).map((_, i) => (
                    <FontAwesome key={`full-${i}`} name="star" size={16} color={color.orange} />
                ))}
                {halfStar === 1 && <FontAwesome key="half" name="star-half" size={16} color={color.orange} />}
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={movie.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` } : require('../../assets/no_poster.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                <Ionicons
                    name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                    size={30}
                    color={isFavorite ? color.orange : color.white}
                    style={styles.bookmarkIcon}
                    onPress={toggleFavorite}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.ratingContainer}>
                        {renderStars(movie.vote_average)}
                        <Text style={styles.ratingText}> {movie.vote_average.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}