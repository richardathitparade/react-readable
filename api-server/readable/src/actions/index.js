import { get_headers } from "../util/util_headers";
import {
  FETCH_CATEGORIES,
  SHOW_CATEGORY,
  REFRESH_POSTS,
  FETCH_CATEGORY_POSTS,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_COMMENTS,
  HIGHLIGHT_POST,
  FETCH_POST_COMMENTS,
  ADD_POST,
  VOTE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  UPDATE_POST_HEADER
} from "./types";
const api = "/api";
const uuidv4 = require("uuid/v4");
//| `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  |
const headers = get_headers();

export const update_post_header = (s, prop_val) => async dispatch => {
  dispatch({
    type: UPDATE_POST_HEADER,
    payload: {
      prop: prop_val,
      val: s
    }
  });
};

export const getCategories = () => async dispatch => {
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: data.categories
      });
    });
};
//| `GET /:category/posts` | Get all of the posts for a particular category. |  |
export const getCategoryPosts = category => async dispatch => {
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_CATEGORY_POSTS,
        category: category,
        payload: data
      })
    );
};
export const showPost = post => async dispatch => {
  dispatch({
    type: HIGHLIGHT_POST,
    highlighted_post: post
  });
};
export const showCategory = category => async dispatch => {
  dispatch({
    type: SHOW_CATEGORY,
    category: category
  });
};
export const refreshPosts = (
  posts,
  category_posts,
  sortBy
) => async dispatch => {
  dispatch({
    type: REFRESH_POSTS,
    posts: posts,
    category_posts: category_posts,
    sortBy: sortBy
  });
};
//| `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
export const getPosts = () => async dispatch => {
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => dispatch({ type: FETCH_POSTS, payload: data }));
};
//| `GET /posts/:id` | Get the details of a single post. | |
export const getPost = id => async dispatch => {
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: FETCH_POST, payload: data });
    });
};
//| `GET /posts/:id/comments` | Get all the comments for a single post. | |
export const getPostComments = id => async dispatch => {
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_POST_COMMENTS,
        id: id,
        payload: data
      })
    );
};
//| `GET /comments/:id` | Get the details for a single comment. | |
export const getComment = id => async dispatch => {
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => dispatch({ type: FETCH_CATEGORY_POSTS, payload: data }));
};
//| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
export const deletePost = id => async dispatch => {
  fetch(`${api}/posts/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => dispatch({ type: DELETE_POST, payload: data }));
};
//| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; |
export const deleteComment = id => async dispatch => {
  fetch(`${api}/comments/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => dispatch({ type: DELETE_COMMENT, payload: data }));
};
//| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
export const addPost = post => async dispatch => {
  post["timestamp"] = new Date().getTime();
  post["id"] = uuidv4();
  fetch(`${api}/posts`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      dispatch({ type: ADD_POST, payload: data });
    });
};
//| `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
export const addComment = comment => async dispatch => {
  comment["timestamp"] = new Date().getTime();
  comment["id"] = uuidv4();
  fetch(`${api}/comments`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: ADD_COMMENT, payload: data });
    });
};
//| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
export const editPost = post => async dispatch => {
  post["timestamp"] = new Date().getTime();
  const id = post.id;
  fetch(`${api}/posts/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => dispatch({ type: UPDATE_POST, payload: data }));
};
//| `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
export const editComment = comment => async dispatch => {
  comment["timestamp"] = new Date().getTime();
  const id = comment.id;
  fetch(`${api}/comments/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => dispatch({ type: UPDATE_COMMENT, payload: data }));
};
//| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
export const votePost = (id, voteDirection) => async dispatch => {
  fetch(`${api}/posts/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ option: voteDirection })
  })
    .then(res => res.json())
    .then(data => dispatch({ type: VOTE_POST, id: id, payload: data }));
};
//| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
export const voteComment = (id, voteDirection) => async dispatch => {
  fetch(`${api}/comments/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ option: voteDirection })
  })
    .then(res => res.json())
    .then(data => dispatch({ type: VOTE_COMMENT, id: id, payload: data }));
};
