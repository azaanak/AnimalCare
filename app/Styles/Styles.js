import {StyleSheet} from 'react-native';
  
const appStyles = StyleSheet.create({ 
    // ----------Custom TextInput---------------
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
    textInput: {
      height: 42,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#d6d7da',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    // ----------Drawer Navigator---------------
    icon: {
		width: 24,
		height: 24,
    },
    link: {
		flex: 1,
		fontSize: 18,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
        textAlign: 'left',
        fontFamily: 'Cochin',
        color: 'black'
    },
    linkDisable: {
		flex: 1,
		fontSize: 18,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
        textAlign: 'left',
        fontFamily: 'Cochin'
    },
    drawerNavigationMenu: {
        height: 40, 
        paddingLeft: 10
    },
    drawerNavigationMenuLabel: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5
    },
    // ----------Table Component---------------
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
        backgroundColor: '#fff'
      },
      backButtonStyle: {
        color: 'white'
      },
      tableRowBorderStyle: {
        borderWidth: -1, 
        borderColor: 'white'
      },
      tableDataBorderStyle:{
        borderColor: 'transparent'
      },
      tableBorderStyle: {
        borderColor: 'transparent'
      },
      contentContainerStyle: {
        width: '100%',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        paddingLeft: 5, 
        paddingRight: 5,
      },
      scrollHorizontal: {
        marginTop: 2, 
        borderTopColor: '#171715', 
        borderTopWidth: 1
      },
      header: {
        height: 50,
        backgroundColor: '#f8faf1',
        borderBottomColor: '#ccc',
        borderBottomWidth: 2, 
      },
      headerText: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3b3a39',
        margin: 6
      },
      text: {
        textAlign: 'left',
        fontSize: 12,
        margin: 6
      },
      row: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
      }
});
   
export { appStyles }
