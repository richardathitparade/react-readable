import {get_headers} from './util_headers';
export const get = () => async dispatch => {
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => dispatch({type: FETCH_CATEGORIES, payload: data }) )
}
//| `GET /:category/posts` | Get all of the posts for a particular category. |  |
export const get = (category) => async dispatch => {
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => dispatch({type: FETCH_CATEGORY_POSTS, payload: data }) )
}
