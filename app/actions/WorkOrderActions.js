import { Constants } from '../resources/constants/Constants';

export function workOrderChanged(workOrderNo, taskTableData) {
	return {
		type: Constants.actionTypes.WORK_ORDER_CHANGED,
		workOrderNo: workOrderNo,
		taskTableData: taskTableData
	};
}

export function selectedTaskChanged(selectedTask) {
	return {
		type: Constants.actionTypes.SELECTED_TASK,
		selectedTask: selectedTask
	};
}
