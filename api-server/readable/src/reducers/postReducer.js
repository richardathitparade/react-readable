import {
  HIGHLIGHT_POST,
  REFRESH_POSTS,
  UPDATE_POST_HEADER,
  DELETE_POST,
  UPDATE_POST,
  VOTE_POST,
  ADD_POST,
  FETCH_POST,
  FETCH_POSTS,
  ADD_COMMENT
} from "../actions/types.js";

export default (
  state = {
    version: 1,
    posts: [],
    post_header: {
      title: "",
      author: "",
      body: "",
      category: "react",
      version: 1
    },
    highlighted_post: null
  },
  action
) => {
  switch (action.type) {
    case DELETE_POST:{
      let highlightedPost = null;
      let posts_ = state.posts.map(post => {
        if (post.id !== action.id) {
          return post;
        }
      });
      return {
        ...state,
        posts: posts_
      };
    } 
    case ADD_COMMENT: {
      if(typeof state.highlighted_post !== 'undefined') {
        state.highlighted_post.commentCount = state.highlighted_post.commentCount +1;
      }
      let posts_ = state.posts.map(post => {
        if (post.id == action.payload.parentId) {
          post.commentCount = post.commentCount +1;
        }
          return post;
      });
      return {
        ...state,
        posts: posts_
      };
    }
    case UPDATE_POST: {
      let posts_ = state.posts.map(post => {
        if (post.id == action.id) {
          return action.payload;
        } else {
          return post;
        }
      });
      return {
        ...state,
        posts: posts_
      };
    }
    case UPDATE_POST_HEADER: {
      let ph = state.post_header || {};
      ph[action.payload.prop] = action.payload.val;
      ph["version"] = ph["version"] + 1;
      return {
        ...state,
        post_header: ph
      };
    }
    case REFRESH_POSTS: {
      let version = state.version + 1;
      return {
        ...state,
        posts: action.posts,
        version: version,
        sortBy: action.sortBy
      };
    }
    case HIGHLIGHT_POST: {
      let version = state.version + 1;
      return {
        ...state,
        highlighted_post: action.payload,
        version: version
      };
    }
    case VOTE_POST: {
      let version = state.version + 1;
      let posts = state.posts.map(p => {
        if (p.id === action.id) {
          return action.payload;
        }
        return p;
      });
      if (
        action &&
        state.highlighted_post &&
        action.id === state.highlighted_post.id
      ) {
        return {
          ...state,
          posts: posts,
          version: version,
          highlighted_post: action.payload
        };
      } else {
        return {
          ...state,
          posts: posts,
          version: version
        };
      }
    }
    case ADD_POST:
      let posts = state.posts;
      posts.push(action.payload);
      let version = state.version + 1;
      return {
        ...state,
        posts: posts,
        version: version
      };
    case FETCH_POST: {
      let version = state.version + 1;
      let posts = state.posts.filter(p => {
        if (p.id !== action.payload.id) {
          return p;
        }
      });
      return {
        ...state,
        posts: posts,
        highlighted_post: action.payload,
        version: version
      };
    }
    case FETCH_POSTS:
      {
        let version = state.version + 1;
        return {
          ...state,
          posts: action.payload,
          version: version
        };
      }
      return action.payload || false;
    default:
      return state;
  }
};
