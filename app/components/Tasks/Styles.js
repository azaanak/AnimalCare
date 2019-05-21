import {StyleSheet} from 'react-native';

const taskStyles = StyleSheet.create({ 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderWidth:1, borderColor:'#d6d7da',borderRadius: 3, margin: 0, 
      padding:0,
    },
    tileBox:{
        width: '100%',
        marginTop:0,
        padding:10,
        borderColor: 'red',
        borderWidth: 0,
        flexDirection:'row'
      },
      textBox:{
        width: '100%',
        marginTop:10,
        padding:10,
        borderColor: '#ccc',
        borderWidth: 1,
      },
      taskHtmlContainer:{
        color: '#000000',
        borderColor: 'red',
        borderWidth: 0,
        margin: 0,
        padding:0,
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
      },
      taskSmallText:{
        fontSize: 11,
        padding:2,
        color: '#000000'
      },
      topBarText:{
        fontSize: 16,
        padding:2,
        color: '#000000'
      },
      topBar: {
        height: 45,
        margin: 2,
        paddingLeft:10,
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        backgroundColor: '#f8faf1',
        borderColor: '#ccc',
        borderBottomWidth: 1, 
        borderTopWidth: 1, 
      },
      containerView: {
        flex:1, 
        alignItems: 'flex-start',
      },
      dropDownPicker: {
        borderWidth:1, borderColor:'#d6d7da',borderRadius: 3, margin: 0, 
        padding:0,
        justifyContent: 'center', 
        height: 40,
      },
      dropDownPickerText: {
        color: '#a29e9d',
        
      },
      labelSelect: {
        marginTop: 0,
        marginBottom: 1,
        padding: 0,
        borderWidth: 0,
        borderRadius: 6,
        borderStyle: 'dashed',
        borderColor: '#6dc2a2'
      },
      text: {
        fontSize: 16,
        color: 'rgb(13, 131, 144)'
      },
      textAreaContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth:1, borderColor:'#d6d7da',borderRadius: 3, margin: 0, 
        padding:0,
      },
      textArea: {
        justifyContent: "flex-start",
        alignItems: 'flex-start', 
        marginTop: 0,
        marginBottom: 1,
        padding: 3,
      },
      dateContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth:1, borderColor:'#d6d7da',borderRadius: 3, margin: 0, 
        flexDirection: 'row',
        height: 40,
        padding: 5,
      },
      dateText: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }

});
   
export { taskStyles }