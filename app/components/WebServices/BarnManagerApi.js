import { LogsInfo } from '../Utils/LogsInfo';

export const ValidateUser = (name, password) => {
    return fetch('http://demo7.folio3.com:8484/api/user/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": name,
            "password": password
        })
    })
    .then((response) => response.json());
};

export function getWorkOrders(token) {
    token = 'Bearer '+token;
    LogsInfo('getWorkOrders => Bearer Token is ==>'+token);
    return fetch('http://demo7.folio3.com:8484/api/Workorder', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        }
    })
	.then((response) => response.json())
	.catch(error => {
		console.log(error);
	});
};

export const getWorkOrdersFilter = (token, values) => {
    token = 'Bearer '+token;
    LogsInfo('getWorkOrdersFilter => \n pageSize is ====> '+values.pageSize+'\n pageNumber is ==> '+values.pageNumber);
    return fetch('http://demo7.folio3.com:8484/api/Workorder/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({
            "PageSize": values.pageSize,
		    "PageNumber": values.pageNumber
        })
    })
    .then((response) => response.json());
};

export const getTaskFilter = (token, values) => {
    token = 'Bearer '+token;
    LogsInfo('getTaskFilter => Bearer Token is ==>'+token);
    LogsInfo('getTaskFilter => \n workorders are ====> '+values.workorders+'\n pageNumber is ==> '+values.pageNumber);
    return fetch('http://demo7.folio3.com:8484/api/task/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({
            "workorders": values.workorders,
            "PageSize": values.pageSize,
            "PageNumber": values.pageNumber
        })
    })
    .then((response) => response.json());
};

export const saveUpdateTask = (token, values) => {
    token = 'Bearer '+token;
    LogsInfo('saveUpdateTask token=>'+token);
    LogsInfo('values.TaskID =>'+values.TaskID);
    LogsInfo('values.formFieldID =>'+values.listFormSubmission[0].formFieldID+'\n formFieldvalue =>'+values.listFormSubmission[0].value);
    
    return fetch('http://demo7.folio3.com:8484/api/FormSubmission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({
            "listFormSubmission": values.listFormSubmission,
            "TaskID": values.TaskID
        })
    })
    .then((response) => response.json());
};

