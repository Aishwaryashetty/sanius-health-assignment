import { StyleSheet } from 'react-native';
import { color, fontSize } from '../../utility/constants';

export default StyleSheet.create({
    movieCard: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    posterCard: {
        backgroundColor: color.beige,
        borderRadius: 8,
        shadowColor: color.black,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
        padding: 5,
        position: 'relative',
    },
    placeholder: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    movieHeader: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    movieInfo: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: fontSize.m,
        fontWeight: 'bold',
        marginBottom: 4,
        color: color.white,
    },
    releaseDate: {
        fontSize: fontSize.s,
        color: color.white,
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    rating: {
        fontSize: fontSize.s,
        marginLeft: 4,
        color: color.white
    },
});