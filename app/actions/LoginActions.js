import { Constants } from '../resources/constants/Constants';

export function loginSuccess(loginUserFullName, token) {
	return {
		type: Constants.actionTypes.LOGIN_SUCCESS,
		loginUserFullName: loginUserFullName,
		token: token
	};
}

export function logout() {
	return {
		type: Constants.actionTypes.LOGOUT
	};
}

export function ValidateUser(name, password) {
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
	.then((response) => response.json())
	.catch(error => {
		console.log(error);
	});
}