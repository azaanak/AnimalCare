var InitialState =  {
	appState:{
		currentScreen: ''
	},
	loginState: {
		authenticated: false,
		username: '',
		password: '',
		firstName:'',
		lastName:'',
		fullName:'',
		token: ''
	},
	navigatorState:{
		selectedScreen: ''
	},
	workOrderState:{
		workOrderNo:'',
		taskTableData: [],
		selectedTask: {
			taskID: '',
			taskNumber: '',
			revisionDate: '',
			division: '',
			workOrderNumber: '',
			assign: '',
			requirement: '', 
			instruction: '',
			formFields:[]
		}
	},
};
export {InitialState};
