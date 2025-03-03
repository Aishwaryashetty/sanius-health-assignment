import { StyleSheet } from 'react-native';
import { fontSize, color } from '../../utility/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: fontSize.l,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: color.white,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingText: {
        fontSize: fontSize.m,
        color: color.white,
        marginLeft: 8,
    },
    overview: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: color.white,
        marginBottom: 24,
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 50,
        right: 16,
        zIndex: 1,
    },
    loadingGif: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    loadingCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});