export function requestLogin() {
    return {
        type: 'REQUEST_LOGIN'
    }
}

export function receiveLogin(data) {
    return {
        type: 'RECEIVE_LOGIN',
        data
    }
}

export function errorLogin(error) {
    return {
        type: 'ERROR_LOGIN',
        error
    }
}

export function requestUser() {
    return {
        type: 'REQUEST_USER'
    }
}

export function receiveUser(user) {
    return {
        type: 'RECEIVE_USER',
        user
    }
}