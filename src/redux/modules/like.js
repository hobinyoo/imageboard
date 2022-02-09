import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions
const LIKE = "LIKE";

// initial state
const initialState = {
    list: [],
   };
   
// action creators
const commentlike = createAction(LIKE, (like_list) => ({ like_list }));


function commentLikeFB() {
  return function (dispatch, getState, {history}) {
    
 
  };
}

// reducer
export default handleActions(
  {
    [LIKE]: (state, action) =>
    produce(state, (draft) => {
      console.log(action.payload)
      let idx = action.payload.post_index
      draft.list.push(...action.payload.like_list);  

      if (action.payload.completed === true) {
        draft.list[idx] = { ...draft.list[idx], ...action.payload.comment_like, ...action.payload.completed };
      } else {
        draft.list[idx] = { ...draft.list[idx], ...action.payload.comment_like, ...action.payload.completed };
      }
    }),
  },
  initialState
);

const actionCreators = {
    commentlike,
};

export { actionCreators };