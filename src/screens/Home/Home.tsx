import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, FlatList, Text, Alert, SafeAreaView, TextInput, Image, RefreshControl, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { nowPlaying, popular, topRated, upcoming, searchMovies, getFavorite } from '../../services/TMDBServices';
import styles from './Styles';
import { color, fontSize, images } from '../../utility/constants';
import MovieCard from '../../components/MovieCard/MovieCard';
import useDebounce from '../../Hooks/useDebounce';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

interface MovieResponse {
    results: Movie[];
    total_pages: number;
}

interface HomeProps {
    category: string;
}

export default function Home({ category }: HomeProps) {
    const fadeAnims = useRef<{ [key: number]: Animated.Value }>({}).current;
    const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [refreshing, setRefreshing] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    useFocusEffect(
        useCallback(() => {
            setQuery('');
            setPage(1);
            setMovies([]);
            fetchMovies(1);
        }, [category])
    );

    useEffect(() => {
        fetchMovies(page);
    }, [page, category, debouncedQuery]);

    const fetchMovies = async (pageNumber: number, refresh: boolean = false) => {
        if (loading || pageNumber > totalPages) return; // Prevent unnecessary fetches
        setLoading(true);
        let data: MovieResponse;
        try {
            // Handle search query fetching
            if (debouncedQuery) {
                data = await searchMovies(debouncedQuery, pageNumber);
            } else {
                // Handle category-based fetching
                switch (category) {
                    case 'now_playing':
                        data = await nowPlaying(pageNumber);
                        break;
                    case 'popular':
                        data = await popular(pageNumber);
                        break;
                    case 'top_rated':
                        data = await topRated(pageNumber);
                        break;
                    case 'upcoming':
                        data = await upcoming(pageNumber);
                        break;
                    case 'favourites':
                        data = await getFavorite(pageNumber);
                        break;
                    default:
                        throw new Error('Invalid category');
                }
            }
            // Update movie list based on refresh or pagination
            const newMovies = refresh || pageNumber === 1 ? data.results : [...movies, ...data.results]; setMovies(newMovies);
            setMovies(newMovies);
            setTotalPages(data.total_pages);

            newMovies.forEach(movie => {
                if (!fadeAnims[movie.id]) {
                    fadeAnims[movie.id] = new Animated.Value(0);
                }
                if (!imageLoaded[movie.id]) {
                    setImageLoaded(prev => ({ ...prev, [movie.id]: false }));
                }
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to load movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Load more movies when reaching list end
    const loadMoreMovies = () => {
        if (!loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Clear search input and reset movie list
    const handleClearSearch = () => {
        setQuery('');
        setPage(1);
        setMovies([]);
    };

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            setPage(1);
            await fetchMovies(1, true);
        } catch (error) {
            Alert.alert('Error', 'Failed to refresh movies. Please try again.');
        } finally {
            setRefreshing(false);
        }
    };

    // Handle image load animation
    const handleImageLoad = (id: number) => {
        if (!imageLoaded[id]) {
            setImageLoaded(prev => ({ ...prev, [id]: true }));
            Animated.timing(fadeAnims[id], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    };

    // Render individual movie card
    const renderMovie = ({ item }: { item: Movie }) => {
        if (!fadeAnims[item.id]) {
            fadeAnims[item.id] = new Animated.Value(0);
        }
        return (
            <MovieCard
                movie={item}
                imageLoaded={imageLoaded[item.id] || false}
                fadeAnim={fadeAnims[item.id]}
                onImageLoad={handleImageLoad}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor={color.beige}
                />
                {query.length > 0 && (
                    <Ionicons name="close" size={24} color={color.beige} onPress={handleClearSearch} />
                )}
            </View>
            {loading && page === 1 ?
                <View style={styles.loadingCenter}>
                    <Image
                        source={images.loadingGif}
                        style={styles.loadingGif}
                    />
                </View>
                : movies.length > 0 ? (
                    <FlatList
                        data={movies}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={renderMovie}
                        onEndReached={loadMoreMovies}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            loading && page > 1 ? (
                                <View style={styles.loadingCenter}>
                                    <Image
                                        source={images.loadingGif}
                                        style={styles.loadingGif}
                                    />
                                </View>
                            ) : null
                        }
                        refreshing={refreshing}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={color.beige}
                            />
                        }
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            color: color.white,
                            fontWeight: 'bold',
                            fontSize: fontSize.m,
                            textAlign: 'center',
                            padding: 20
                        }}>
                            {query ? 'No movies found' : 'No Movies in Favourites, Go Ahead and add few!'}
                        </Text>
                    </View>
                )}
        </SafeAreaView>
    );
}