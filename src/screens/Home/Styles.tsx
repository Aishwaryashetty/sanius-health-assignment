import { StyleSheet } from 'react-native';
import { color } from '../../utility/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.darkPurple,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchInput: {
        flex: 1,
        borderWidth: 2,
        borderColor: color.beige,
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
        fontWeight: 'bold',
        color: color.beige
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

export default styles;