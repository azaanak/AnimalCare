import React, { Component } from "react";
import CustomTableView from '../Utils/CustomTableView';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['TASK NO', 'TITLE', 'LAST REV. DATE', 'WORK ORDER', 'STATUS'],
      widthArr: [80, 250, 150, 150, 100]
  }};

  goBackToWorkOrder = () => {
    const { navigation } = this.props;
    navigation.state.params.workOrderCallback(true);
    navigation.goBack();
  };

  onTaskItemClicked (index, drawerNavigation) {
    drawerNavigation.state.params.selectedTaskChanged(index);
    drawerNavigation.navigate("TaskForm");
  };

  render() {
    const state = this.state;
    return (
      <CustomTableView 
        sideMenuClicked={() => this.props.navigation.toggleDrawer()}
        drawerNavigation={this.props.navigation}
        headerTitle={"Tasks"}
        headerClicked={() => this.props.navigation.toggleDrawer()}
        headerIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
        footerButtonText={"Workorders"}
        footerButtonClicked={ () => this.goBackToWorkOrder() }
        tableHeader={state.tableHead}
        tableData={this.props.workOrderState.taskTableData}
        columnWidthArr={state.widthArr}
        itemSelectCallback={this.onTaskItemClicked}
      />
    )
  }
}

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return {
        workOrderState: state.workOrderState
    };
}

export default connect(mapStateToProps)(Tasks)