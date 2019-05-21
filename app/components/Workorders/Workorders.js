import React, { Component } from "react";
import Moment from 'moment';
import { LogsInfo } from '../Utils/LogsInfo';
import { workOrderChanged, selectedTaskChanged } from '../../actions/WorkOrderActions';
import { getWorkOrdersFilter, getTaskFilter } from '../WebServices/BarnManagerApi';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import CustomHeader from '../Utils/CustomHeader';
import { appStyles } from '../../Styles/Styles';
import { Table, Row } from 'react-native-table-component';
import { Container, Content, Footer } from 'native-base';

class Workorders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restApiData: null,
      restApiTaskData: null,
      tableHead: ['WORKORDER NO', 'TITLE', 'PROGRAM', 'LAST REV. DATE', 'REVIEW', 'STATUS'],
      widthArr: [110, 110, 80, 160, 90, 80],
      tableData: [],
      isDataLoaded: false,
      itemSelected: '',
      current_page: 1,
      loading: false,
      error: null,
      hasMore: true
    };
  };

  componentWillMount() {
    this.getWorkOrdersFromAPI();
  };

  selectedTaskChanged = selectedTaskIndex => {
    task = null;
    if(this.state.restApiTaskData != null && this.state.restApiTaskData != []){
      task = this.state.restApiTaskData[selectedTaskIndex];
      woNumber = (task.workorder != null ? task.workorder.workorderNumber : 'N/A');
      var dt = ((task.revisionDateTime != '' && task.revisionDateTime != null) ? task.revisionDateTime : null);
      Moment.locale('en');
      revisionDate = Moment(dt).format("MM-DD-YYYY");
      formFields = [];
      for(let i = 0; i < task.formFields.length; i++){
        list = task.formFields[i].specification;
        dropDownList = null;
        value = '';
        if(list != null){
          if(task.formFields[i].fieldType == 9){
            multiSelectList = list.split(',');
            dropDownList=[];
            for(let m = 0; m < multiSelectList.length; m++){
              name = multiSelectList[m];
              if(name.trim() != ''){
                dropDownList.push({name: name, isSelected: false, value: name});
              }
            }
          }else{
            dropDownList = list.split(',');
            // value = dropDownList[0].trim();
          }
        }
        
        formFields.push({...task.formFields[i], dropDownList: dropDownList, value: value});
      }
      selectedTask = {
        taskID: task.id,
        taskNumber: task.taskNumber,
        revisionDate: revisionDate,
        division: 'N/A',
        workOrderNumber: woNumber,
        assign: 'N/A',
        requirement: ((task.requirement != '' && task.requirement != null) ? task.requirement : 'N/A'), 
        instruction: ((task.instruction != '' && task.instruction != null) ? task.instruction : 'N/A'),
        formFields: formFields
      };
      this.props.taskChanged(selectedTask);
    }
  };

  workOrderCallback = data => {
    this.props.selectedItemChanged('', []);
  };

  navigateToTaskView(index) {
    selectedWorkOrderNo = this.state.tableData[index][0];
    if(selectedWorkOrderNo == 'Ahmed'){ selectedWorkOrderNo = 196 }else if(selectedWorkOrderNo == 'WO-01'){
      selectedWorkOrderNo = 213;
    }
    this.setState({ itemSelected: selectedWorkOrderNo, restApiTaskData: [] });
    taskTableData = this.getTasksFromAPI(selectedWorkOrderNo);
    const { navigation } = this.props;
    navigation.navigate("Tasks", { workOrderCallback: this.workOrderCallback, selectedTaskChanged: this.selectedTaskChanged });
  };

  getWorkOrdersFromAPI = () => {
    if (this.state.loading) { return; }
    this.setState({ loading: true });
    getWorkOrdersFilter(this.props.authState.token, { pageSize: 18, pageNumber: this.state.current_page})
    .then((responseJson) => {
      if(responseJson.message == "Success") {
        LogsInfo('responseJson.message = '+responseJson.message);
        //LogsInfo('Received data for request. '+responseJson.result.elements[0].workorderNumber);
        this.updateData(responseJson.result.elements);
      }
      else {
        LogsInfo('no data for request. ');
        this.clearData();
      }
   })
    .catch((error) => {
      LogsInfo('error calling getWorkOrdersFromAPI service.');
      this.clearData();
    });
  };

  updateData = (elements) => {
    /** -------- JSON Mapping --------
     * Table Columns: 'WORKORDER NO', 'TITLE', 'PROGRAM', 'LAST REV. DATE', 'REVIEW', 'STATUS'
     * JSON Array:    workorderNumber, title, program, revisionDateTime, reviewStatus, status
     */
    var tableData = this.state.tableData;
    var programNo = null;
	  for(let i = 0; i < elements.length; i++){
      programNo = null;
      if (elements[i].program != null) {
        programNo = elements[i].program.programNumber;
      }
      tableData.push([ elements[i].id, elements[i].workorderNumber, elements[i].title, programNo,
          elements[i].revisionDateTime, elements[i].reviewStatus, elements[i].status]);
    }
    this.setState({ tableData: tableData, restApiData: elements, isDataLoaded: true, loading: false, hasMore:true, current_page: this.state.current_page + 1});
  };

  clearData = () => {
    if (this.state.current_page == 1){
      this.setState({ tableData: [], restApiData: null, isDataLoaded: false, loading: false, hasMore:false });
    }else if (this.state.current_page > 1){
      this.setState({ isDataLoaded: true, loading: false, hasMore:false });
    }
  };
  getTasksFromAPI = (workOrderNo) => {
    getTaskFilter(this.props.authState.token, { workorders:[workOrderNo], pageSize: 100, pageNumber: 1})
      .then((responseJson) => {
        if(responseJson.message == "Success") {
          LogsInfo('responseJson.message = '+responseJson.message);
          //LogsInfo('Received data for request. '+responseJson.result.elements[0].taskNumber);
          taskTableData = this.updateTaskData(responseJson.result.elements);
          this.props.selectedItemChanged(workOrderNo, taskTableData);
        }
        else {
          if(responseJson.message == undefined){
            LogsInfo('Status: '+responseJson.status+'\n '+responseJson.title);
          }else{
            LogsInfo(''+responseJson.message);
          }
          this.props.selectedItemChanged(workOrderNo, []);
        }
    })
    .catch((error) => {
        LogsInfo('error calling getTasksFromAPI service.');
        this.props.selectedItemChanged(workOrderNo, []);
    });    
  };

  updateTaskData = (elements) => {
    /** -------- JSON Mapping --------
     * Table Columns: 'TASK NO', 'TITLE', 'LAST REV. DATE', 'WORK ORDER', 'STATUS'
     * JSON Array:    taskNumber, title, revisionDateTime, workorderNumber, status
     */
    taskTableData = [];
    workOrderNo = null;
	  for(let i = 0; i < elements.length; i++){
      workOrderNo = null;
      if (elements[i].workorder != null) {
        workOrderNo = elements[i].workorder.workorderNumber;
      }      
      taskTableData.push([ elements[i].taskNumber, elements[i].title, elements[i].revisionDateTime,
          workOrderNo, elements[i].status
      ]);
    }
    this.setState({restApiTaskData: elements});
    return taskTableData;
  };
  
  isCloseToBottom ({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50; 
  };
  render() {
    const state = this.state;
    return (
      <Container onPress={() => this.props.navigation.toggleDrawer()}>
        <CustomHeader title="Workorders" onPress={() => this.props.navigation.toggleDrawer()} navigation={this.props.navigation}
          drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} 
        />
        <ScrollView horizontal={true} style={appStyles.scrollHorizontal} >
          <Content contentContainerStyle={appStyles.contentContainerStyle}>
            <Table borderStyle={appStyles.tableBorderStyle}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={appStyles.header} textStyle={appStyles.headerText}/>
            </Table>
            {
              this.state.dataLoading ? 
                <View style={{width: '60%', height:'80%', justifyContent:'center', alignContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size='large' animating={this.state.dataLoading} />
                  <Text children='Loading...' />
                </View>
              :
                <ScrollView style={appStyles.dataWrapper}
                  onScroll={({ nativeEvent }) => {
                    if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) { 
                      this.getWorkOrdersFromAPI(); }}}> 
                  <Table borderStyle={appStyles.tableDataBorderStyle}>
                    {state.tableData.map((rowData, index) => (
                      <TouchableOpacity style={appStyles.row} onPress={() => this.navigateToTaskView(index)}>
                      <Row 
                        key={index} 
                        data={rowData}
                        widthArr={state.widthArr} 
                        borderStyle={appStyles.tableRowBorderStyle}
                        style={[appStyles.row, index%2 && {backgroundColor: '#fbfaf6'}]}
                        textStyle={appStyles.text}
                      />
                      </TouchableOpacity>          
                    ))}
                  </Table>
                </ScrollView>
            }
          </Content>
        </ScrollView>
        <Footer>
          <ActivityIndicator size='small' animating={this.state.loading} />
        </Footer>
      </Container>
    )
  };
};

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        workOrderState: state.workOrderState
    };
}

function mapDispatchToProps(dispatch) {
  return {
      selectedItemChanged: (workOrderNo, taskTableData) => {
          dispatch( workOrderChanged(workOrderNo, taskTableData) );
      },
      taskChanged: (selectedTask) => {
        dispatch( selectedTaskChanged(selectedTask) );
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workorders)