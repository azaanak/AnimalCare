import { Constants } from '../resources/constants/Constants';
import { InitialState } from './InitialState';

export default function (state = InitialState.workOrderState, action) {
    switch (action.type) {
        case Constants.actionTypes.WORK_ORDER_CHANGED:
            return{
                ...state,
                workOrderNo: action.workOrderNo,
                taskTableData: action.taskTableData,
            };
        case Constants.actionTypes.SELECTED_TASK:
            return {
                ...state,
                selectedTask: action.selectedTask
			};
        default:
            return state;
    }
}
