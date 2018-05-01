import { REFRESH_POSTS,DELETE_POST, ADD_POST, FETCH_CATEGORIES, FETCH_CATEGORY_POSTS, SHOW_CATEGORY,VOTE_POST} from "../actions/types.js";
export default (state = { categories: [], category_posts: {}, highlighted_category: 'all' , version: 1000}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:{
      return {
        ...state,
        categories: action.payload
      }
    }
    case DELETE_POST:{
      let cp = state.category_posts || {};
      let new_cp = {};
      Object.keys(cp).forEach(k => {
          let posts = cp[k].map(post => {
            if(post.id !== action.id) {
              return post;
            }
          });
          new_cp[k]=posts;
      });
      return {
        ...state,
        category_posts: action.category_posts
      }
    }
    case REFRESH_POSTS: {
      return {
        ...state,
        category_posts: action.category_posts
      }
    }
    case ADD_POST: {
      let cp = state.category_posts || {};
      let new_posts = cp[action.payload.category] && cp[action.payload.category].map(ncp =>{
          if(ncp.id === action.payload.id) {
            return action.payload;
          }
          return ncp;
      });
      new_posts.push(action.payload);
      return {
        ...state,
        category_posts: cp
      }
    }
    case VOTE_POST: {
      let cp = state.category_posts || {};
      let new_posts = cp[action.payload.category] && cp[action.payload.category].map(ncp =>{
          if(ncp.id === action.payload.id) {
            return action.payload;
          }
          return ncp;
      });
      cp[action.payload.category] = new_posts;
        return {
          ...state,
          category_posts: cp
        }
      }
    case FETCH_CATEGORY_POSTS:{
      let cp = state.category_posts || {};
      cp[action.category] = action.payload;
      let version = state.version + 1;
      return {
        ...state,
        category_posts: cp,
        version: version
      }
    }
    case SHOW_CATEGORY: {
      let version = state.version + 1;
      return {
        ...state,
        highlighted_category: action.category,
        version: version
      }
    }
    default:{
      return state;
    }
  }
};
