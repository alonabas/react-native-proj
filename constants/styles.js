import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    main: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    menuButtonContainer: {
        padding: 5,
        borderRadius: 4,
        marginHorizontal: 10,
        // marginVertical: 5
    },
    mainContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 20,
    }
})