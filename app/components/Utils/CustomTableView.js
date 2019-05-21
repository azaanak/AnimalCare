import React, { Component } from "react";
import {
  Text
} from "react-native";
import CustomHeader from './CustomHeader';
import { appStyles } from '../../Styles/Styles';
import { Button, Container, Footer } from 'native-base';
import CustomDataGrid from "./CustomDataGrid";

const CustomTableView = ({sideMenuClicked, drawerNavigation, headerTitle, headerClicked, headerIconClicked, footerButtonText,
        footerButtonClicked, tableHeader, tableData, columnWidthArr, itemSelectCallback}) => {
    return (
        <Container onPress={sideMenuClicked}>
            <CustomHeader title={headerTitle} onPress={headerClicked} navigation={drawerNavigation}
                drawerOpen={headerIconClicked} 
            />
            <CustomDataGrid 
                tableHeader={tableHeader} tableData={tableData} 
                columnWidthArr={columnWidthArr} 
                itemSelectCallback={itemSelectCallback}
                drawerNavigation={drawerNavigation}
            />
            <Footer>
                <Button onPress={footerButtonClicked} full>
                    <Text style={appStyles.backButtonStyle}>{footerButtonText}</Text>
                </Button>
            </Footer>
      </Container>
    )
};
    
export default CustomTableView;
