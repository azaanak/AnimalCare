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
}