import { StyleSheet } from 'react-native';
import { fontSize, color } from '../../utility/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: "bold",
        color: color.white,
        textAlign: 'center',
        textShadowColor: color.black,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginBottom: 30,
    },
    loadingGif: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});