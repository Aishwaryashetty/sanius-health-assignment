import axios from "axios";
import { API_URL, TOKEN, ACCOUNT_ID } from '../utility/constants';

const fetchData = async (endpoint: string, page: number = 1) => {
    try {
        const response = await axios.get(`${API_URL}/movie/${endpoint}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
            params: { page }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies. Please try again later.');
    }
};

export const nowPlaying = async (page: number = 1) => fetchData('now_playing', page);

export const upcoming = async (page: number = 1) => fetchData('upcoming', page);

export const topRated = async (page: number = 1) => fetchData('top_rated', page);

export const popular = async (page: number = 1) => fetchData('popular', page);

export const searchMovies = async (query: string, page: number = 1) => {
    try {
        const response = await axios.get(`${API_URL}/search/movie`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
            params: {
                query,
                page,
                include_adult: true,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to search movies. Please try again later.');
    }
};

export const getMovieDetails = async (movie_id: string) => {
    try {
        const response = await axios.get(`${API_URL}/movie/${movie_id}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
            params: {
                movie_id,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get movie details. Please try again later.');
    }
};

export const getFavorite = async (page: number = 1) => {
    try {
        const response = await axios.get(`${API_URL}/account/${ACCOUNT_ID}/favorite/movies`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
            params: {
                page,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get favorites movies. Please try again later.');
    }
};

export const addToFavorite = async (movie_id: number, favorite: boolean = true) => {
    try {
        const response = await axios.post(`${API_URL}/account/${ACCOUNT_ID}/favorite`,
            {
                media_type: 'movie',
                media_id: movie_id,
                favorite: favorite,
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
            });
        return response.data;
    } catch (error) {
        throw new Error('Failed to added movie to favorites. Please try again later.');
    }
};