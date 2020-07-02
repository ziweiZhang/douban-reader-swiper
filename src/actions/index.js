export const GET_LIST = 'GET_LIST';
export const getList = (tag, list) => ({
    type: GET_LIST,
    tag,
    list
});
export const fetchList = tag => dispatch => {
    return fetch(`/json/${tag}`, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
        .then(response => response.json())
        .then(json => dispatch(getList(tag, json.data)))
}