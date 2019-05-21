import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { appStyles } from '../../Styles/Styles';
import { Table, Row } from 'react-native-table-component';
import { Content } from 'native-base';
import { LogsInfo } from '../Utils/LogsInfo';

const CustomDataGrid = ({tableHeader, tableData, columnWidthArr, itemSelectCallback, drawerNavigation}) => {
    onItemClicked = (index) => {
        itemSelectCallback(index, drawerNavigation);
    };
    return (
        <ScrollView horizontal={true} style={appStyles.scrollHorizontal} >
            <Content contentContainerStyle={appStyles.contentContainerStyle}>
                <Table borderStyle={appStyles.tableBorderStyle}>
                    <Row data={tableHeader} widthArr={columnWidthArr} style={appStyles.header} textStyle={appStyles.headerText}/>
                </Table>
                <ScrollView style={appStyles.dataWrapper}>
                    <Table borderStyle={appStyles.tableDataBorderStyle}>
                        {tableData.map((rowData, index) => (
                        <TouchableOpacity style={appStyles.row} onPress={() => onItemClicked(index,)}>
                        <Row 
                            key={index} 
                            data={rowData}
                            widthArr={columnWidthArr} 
                            borderStyle={appStyles.tableRowBorderStyle}
                            style={[appStyles.row, index%2 && {backgroundColor: '#fbfaf6'}]}
                            textStyle={appStyles.text}
                        />
                        </TouchableOpacity>          
                        ))}
                    </Table>
                </ScrollView>
            </Content>
        </ScrollView>
    )
};

export default CustomDataGrid
