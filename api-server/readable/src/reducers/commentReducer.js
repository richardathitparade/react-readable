import {
  FETCH_COMMENTS,
  FETCH_POST_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "../actions/types.js";

export default (
  state = { comments: [], post_comments: {}, version: 1 },
  action
) => {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      };
    }
    case FETCH_POST_COMMENTS: {
      let pc = state.post_comments || {};
      pc[action.id] = action.payload;
      return {
        ...state,
        post_comments: pc
      };
    }
    case VOTE_COMMENT: {
      let version = state.version + 1 || 1;
      let pc = state.post_comments || {};
      if (typeof pc[action.payload.parentId] !== "undefined") {
        let new_pc = pc[action.payload.parentId].map(comment => {
          if (comment.id == action.id) {
            return action.payload;
          } else {
            return comment;
          }
        });
        pc[action.payload.parentId] = new_pc;
        return {
          ...state,
          post_comments: pc,
          version: version
        };
      }
      return state;
    }
    case ADD_COMMENT: {
      if (typeof state.comments !== "undefined") {
        let comments = state.comments;
        let pc = state.post_comments || {};
        let version = state.version + 1;
        if (typeof pc[action.payload.parentId] !== "undefined") {
          let new_pc = pc[action.payload.parentId];
          new_pc.push(action.payload);
          pc[action.payload.parentId] = new_pc;

        }
        return {
          ...state,
          comments: comments,
          post_comments: pc,
          version: version
        };
      }
      return action.payload || false;
    }
    case VOTE_COMMENT:
      return action.payload || false;
    case UPDATE_COMMENT: {
      if (typeof state.comments !== "undefined") {
        let comments = state.comments.map(comment => {
          if (action.id == comment.id) {
            return action.payload;
          } else {
            return comment;
          }
        });
        let pc = state.post_comments || {};
        let version = state.version + 1;
        if (typeof pc[action.payload.parentId] !== "undefined") {
          let new_pc = pc[action.payload.parentId].map(comment => {
            if (comment.id == action.id) {
              return action.payload;
            } else {
              return comment;
            }
          });
          pc[action.payload.parentId] = new_pc;
        }
        return {
          ...state,
          post_comments: pc,
          comments: comments,
          version: version
        };
      } else {
        return state;
      }
    }
    case DELETE_COMMENT: {
      let new_posts = {};
      let comments = state.comments.map(comment => {
          if (action.id != comment.id) {
            return comment;
          }
        });
      let pc = state.post_comments || {};
      let version = state.version + 1;
      Object.keys(pc).forEach(function(k){
              let post_comments = pc[k].map(comment => {
                  if(action.id !== comment.id) {
                    return comment;
                  }
              });
              new_posts[k] = post_comments;
      });
      return {
          ...state,
          post_comments: new_posts,
          comments: comments,
          version: version
      };
    }
    default:
      return state;
  }
};
