import React, { Component } from "react";
import { taskStyles } from './Styles';
import { appStyles } from '../../Styles/Styles';
import CustomHeader from '../Utils/CustomHeader';
import { LogsInfo } from '../Utils/LogsInfo';
import HTML from 'react-native-render-html';
import Moment from 'moment';
import { saveUpdateTask } from '../WebServices/BarnManagerApi';
import { selectedTaskChanged } from '../../actions/WorkOrderActions';
import { Button, Container, Footer, Content, Icon} from 'native-base';
import LabelSelect from '../LabelSelect';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    Text,
    View,
    Alert,
    TextInput,
    ScrollView,
    Picker,
    Dimensions,
  } from "react-native";

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            specification: ['imran', 'Ali', 'khan'],
            isDateTimePickerVisible: false
        };
    };

    clearData = () => {
        this.setState({ submitting: false });
    };

    goBackToTask = () =>{
        this.clearData();
        const { navigation } = this.props;
        navigation.navigate("Tasks");
    };

    saveTaskForm = () => {
        listFormSubmission=[];
        for(let i = 0; i < this.props.workOrderState.selectedTask.formFields.length; i++){
            value = this.props.workOrderState.selectedTask.formFields[i].value;
            if(this.props.workOrderState.selectedTask.formFields[i].fieldType == 9){
                dropDownList = this.props.workOrderState.selectedTask.formFields[i].dropDownList;
                for(let m = 0; m < dropDownList.length; m++){
                    item = dropDownList[m];
                    if(item.isSelected && item.value.trim() != ''){
                        value = value + (value.trim() == '' ? '' : ',') + item.value;
                    }
                }
            }
            LogsInfo(`formFields title = ${this.props.workOrderState.selectedTask.formFields[i].title} and value is ${value}`);
            listFormSubmission.push({
                "formFieldID": this.props.workOrderState.selectedTask.formFields[i].id,
                "value": value
            });
        };

        if (listFormSubmission.length > 0){
            LogsInfo(`token is => ${this.props.authState.token}`);
            LogsInfo(`Task id is => ${this.props.workOrderState.selectedTask.taskID}`);
            for(let i = 0; i < listFormSubmission.length; i++){
                LogsInfo(`formFieldID is => ${listFormSubmission[i].formFieldID} \n value is => ${listFormSubmission[i].value}`);
            }
            
            this.submitTaskFrom(listFormSubmission);
            

        }else{
            this.goBackToTask();
        }
        
    };

    submitTaskFrom = (listFormSubmission) => {
        LogsInfo(`calling submitTaskFrom `);
        if (this.state.submitting) { return; }
        this.setState({ submitting: true });
        saveUpdateTask(this.props.authState.token, { TaskID:this.props.workOrderState.selectedTask.taskID, listFormSubmission: listFormSubmission})
        .then((responseJson) => {
          if(responseJson.message == "Success") {
            LogsInfo('Received data for request. ');
            Alert.alert('Form Submitted Successfully!');
            this.goBackToTask();
          }
          else {
            LogsInfo('Response Message ==> '+responseJson.message);
            Alert.alert(''+responseJson.message);
            this.clearData();
          }
       })
        .catch((error) => {
          LogsInfo('error calling getWorkOrdersFromAPI service.');
          this.clearData();
        });
    };

  render() {
    const { navigation } = this.props;
    return (
        <Container onPress={() => this.props.navigation.toggleDrawer()}>
            <CustomHeader 
                title={"Task Update"} 
                onPress={() => navigation.toggleDrawer()} 
                navigation={navigation}
                drawerOpen={() => navigation.navigate('DrawerOpen')} 
            />
            <View style={taskStyles.topBar}>
                <Text style={taskStyles.topBarText}>{"AMR Monitering Record  [ "+this.props.workOrderState.selectedTask.taskNumber+" ]"}</Text>
            </View>
            <ScrollView>
            <Content contentContainerStyle={appStyles.contentContainerStyle}>
            <View style={taskStyles.tileBox}> 
                <View style={taskStyles.containerView} >
                    <Text style={taskStyles.taskSmallText}>{"Revison Date"}</Text>
                    <Text style={taskStyles.topBarText}>{this.props.workOrderState.selectedTask.revisionDate}</Text>
                </View>
                <View style={taskStyles.containerView}>
                    <Text style={taskStyles.taskSmallText}>{"Division"}</Text>
                    <Text style={taskStyles.topBarText}>{this.props.workOrderState.selectedTask.division}</Text>
                </View>
            </View>            
            <View style={taskStyles.tileBox}> 
                <View style={taskStyles.containerView}>
                    <Text style={taskStyles.taskSmallText}>{"Work Order No"}</Text>
                    <Text style={taskStyles.topBarText}>{this.props.workOrderState.selectedTask.workOrderNumber}</Text>
                </View>
                <View style={taskStyles.containerView}>
                    <Text style={taskStyles.taskSmallText}>{"Assign"}</Text>
                    <Text style={taskStyles.topBarText}>{this.props.workOrderState.selectedTask.assign}</Text>
                </View>
            </View>
                <View style={taskStyles.textBox}> 
                    <Text style={taskStyles.topBarText}>{"Requirements"}</Text>
                    <HTML containerStyle={taskStyles.taskHtmlContainer} html={this.props.workOrderState.selectedTask.requirement} imagesMaxWidth={Dimensions.get('window').width} />
                </View>
                <View style={taskStyles.textBox}>
                    <Text style={taskStyles.topBarText}>{"Instructions"}</Text>
                    <HTML containerStyle={taskStyles.taskHtmlContainer} html={this.props.workOrderState.selectedTask.instruction} imagesMaxWidth={Dimensions.get('window').width} />
                </View>
                <View style={taskStyles.textBox}>
                    {this.props.workOrderState.selectedTask.formFields.map((rowData, index) => (
                        rowData.isActive ?
                            <View > 
                                <Text style={taskStyles.topBarText}>{rowData.title}</Text>
                                {
                                    (rowData.fieldType == 2 || rowData.fieldType == 9) ? 
                                    (
                                        (rowData.fieldType == 2) ? 
                                        <View style={taskStyles.dropDownPicker}>
                                            <Picker 
                                                style={taskStyles.dropDownPickerText}
                                                selectedValue={rowData.value}
                                                onValueChange={(itemValue, itemIndex) => {
                                                        rowData.value = itemValue;
                                                        this.props.workOrderState.selectedTask.formFields.value = itemValue;
                                                        this.props.taskChanged(this.props.workOrderState.selectedTask);
                                                    }    
                                                }
                                                >
                                                {rowData.dropDownList.map((listData, index) => (
                                                    <Picker.Item label={listData.trim()} value={listData.trim()} />
                                                    ))
                                                }
                                            </Picker>
                                        </View>
                                        :
                                        <View style={taskStyles.container}>
                                            
                                            <LabelSelect
                                                title="Checkbox"
                                                ref="select"
                                                style={taskStyles.labelSelect}
                                                onConfirm={(list) => {
                                                        arr = rowData.dropDownList;
                                                        for (let item of list) {
                                                            let index = arr.findIndex(ele => ele === item);
                                                            if (~index) arr[index].isSelected = true;
                                                            else continue;
                                                        }
                                                        this.props.taskChanged(this.props.workOrderState.selectedTask);
                                                    }    
                                                }
                                                >
                                                {rowData.dropDownList.filter(item => item.isSelected).map((item, index) =>
                                                    <LabelSelect.Label
                                                        key={'label-' + index}
                                                        data={item}
                                                        onCancel={() => {
                                                                arr = rowData.dropDownList;
                                                                let index = arr.findIndex(a => a === item);
                                                                arr[index].isSelected = false;
                                                                this.props.taskChanged(this.props.workOrderState.selectedTask);
                                                            }
                                                        }
                                                        >
                                                        {item.name}
                                                    </LabelSelect.Label>
                                                )}
                                                {rowData.dropDownList.filter(item => !item.isSelected).map((item, index) =>
                                                    <LabelSelect.ModalItem
                                                        key={'modal-item-' + index}
                                                        data={item}
                                                        >
                                                        {item.name}
                                                    </LabelSelect.ModalItem>
                                                )}
                                            </LabelSelect>
                                        </View>
                                    )    
                                    :
                                    (
                                        (rowData.fieldType == 4) ?
                                            <View style={taskStyles.textAreaContainer}>
                                                <TextInput
                                                style={taskStyles.textArea}
                                                underlineColorAndroid="transparent"
                                                placeholder="value"
                                                placeholderTextColor="grey"
                                                numberOfLines={4}
                                                multiline={true}
                                                textAlignVertical="top"
                                                defaultValue={rowData.value}
                                                onChangeText={(text) => rowData.value = text} 
                                                />
                                            </View>
                                        :
                                        (
                                            (rowData.fieldType == 11) ?
                                                <View style={taskStyles.dateContainer}>
                                                    <Text style={taskStyles.dateText}>
                                                        {rowData.value}
                                                    </Text>
                                                    <DateTimePicker
                                                        isVisible={this.state.isDateTimePickerVisible}
                                                        onConfirm={(date) => {
                                                                this.setState({ isDateTimePickerVisible: false });
                                                                Moment.locale('en');
                                                                rowData.value = Moment(date).format("MM-DD-YYYY");
                                                                this.props.taskChanged(this.props.workOrderState.selectedTask);
                                                            }
                                                        }
                                                        onCancel={() => {
                                                                this.setState({ isDateTimePickerVisible: false });
                                                            }
                                                        }
                                                    />
                                                    <Icon name="calendar" onPress={() => this.setState({ isDateTimePickerVisible: true })} />
                                                </View>
                                            :
                                                <TextInput style={appStyles.textInput} placeholder={'value'} 
                                                    onChangeText={(text) => rowData.value = text} 
                                                    defaultValue={rowData.value}
                                                />
                                        )  
                                    )
                                }
                                <Text style={{height: 10}}></Text>
                            </View>
                        :
                            <View></View>
                    ))}
                </View>
            </Content>
            </ScrollView>
            <Footer>
                {
                    this.props.workOrderState.selectedTask.formFields.length > 0 ?
                        <Button onPress={() => this.saveTaskForm()} full>
                            <Text style={appStyles.backButtonStyle}>{"Save"}</Text>
                        </Button>
                    :
                        <Text style={{width: 0}}></Text>
                }
                <Text style={{width: 30}}></Text>
                <Button onPress={() => this.goBackToTask()} full>
                    <Text style={appStyles.backButtonStyle}>{"Close"}</Text>
                </Button>
            </Footer>
        </Container>
    )
  }
}

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        workOrderState: state.workOrderState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskChanged: (selectedTask) => {
            dispatch( selectedTaskChanged(selectedTask) );
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)