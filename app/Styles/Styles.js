import {StyleSheet} from 'react-native';
  
const appStyles = StyleSheet.create({ 
    textInputComponentStyles: {
        width: '100%', 
        justifyContent: 'flex-start', 
        backgroundColor: '#FFFFFF', 
        flexDirection:'row'
    },
    textInputStyles: {
        width: '85%',
        height: '95%',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#d6d7da'
    },
});
   
export { appStyles }
