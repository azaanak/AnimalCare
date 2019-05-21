import {StyleSheet} from 'react-native';

const dashboardStyles = StyleSheet.create({ 
    //grey
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    dashboardMainContainerStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    drawerHeader: {
        height: 160,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    drawerImage: {
        borderRadius: 75
    },
    menuScrollView: {
        flex: 1,
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1, 
        textAlign: 'right',
        marginRight: 20,
        color: 'black'
    },
    description: {
        flex: 1, 
        marginLeft: 20,
        fontSize: 16,
        color: 'black'
    }
});
   
export { dashboardStyles }