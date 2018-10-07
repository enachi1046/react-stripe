export function Logout(props) {
    delete localStorage.token;
    props.history.push('/login');
    return null;
}