

const user = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            data: undefined,
            token: undefined,
            is_fetching: false,
            error: undefined
        }
    }    
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                data: undefined,
                token: undefined,
                is_fetching: true,
                error: undefined
            };
        case 'RECEIVE_LOGIN':
            console.log('user_id', action.data.user)
            return {
                data: action.data.user,
                token: action.data.token,
                is_fetching: false,
                error: undefined
            };
        case 'ERROR_LOGIN':
            return {
                data: undefined,
                token: undefined,
                is_fetching: false,
                error: action.error
            };

        case 'REQUEST_USER':
            return {
                token: state.token,
                data: undefined,
                is_fetching: true,
                error: undefined
            };
        case 'RECEIVE_USER':
            return {
                token: state.token,
                data: action.user,
                is_fetching: false,
                error: undefined
            };

        default:
            return state
    }
}

export default user;
