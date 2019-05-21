import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({ 
    loginMainContainerStyles: {
        height: '100%',
        backgroundColor: '#FFFFFF', 
    },
    logoContainerStyles: {
        // either we use flex or height,
        // 'flex' props allows 'keyboard' to push UI up, 'height' props does not allow that.

        // flex: 1,
        width: '100%', 
        height: 130, 
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#FFFFFF', 
        paddingTop: 15
    },
    inputContainerParentStyles: {
        backgroundColor: '#FFFFFF'
    },
    inputContainerStyles: {
        width: '100%', 
        height: 300, 
        padding: 15, 
        justifyContent:'space-between', 
        backgroundColor: '#FFFFFF'
    },
    loginTextStyles: {
        fontSize:24, 
        fontFamily: 'Cochin', 
        paddingLeft:4,
        backgroundColor: '#FFFFFF', 
    },
    loginButtonContainer: {
        width: 110, 
        height:40
    },
    loginButtonStyles: {
        width: 110, 
        height: 40,
        backgroundColor: '#FFFFFF', 
    },
    loginInvalidUserMsg:{
        fontSize:14, 
        fontFamily: 'sans-serif-condensed', 
        color: 'red'
    },
    bottomContainerStyles: {
        flex: 1, 
        width: '100%', 
        backgroundColor: '#FFFFFF'
    },
});
   
export { loginStyles }