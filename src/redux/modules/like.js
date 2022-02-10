import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import firebase from "firebase/compat/app";
import "moment";
import moment from "moment";
import { actionCreators as postActions } from "./post";


const ADDLIKE = "ADDLIKE";

const addLike = createAction(ADDLIKE, (post_id) => ({ post_id }));


const initialState = {
    list: {},
    is_loading: false,
};
const addLikeFB = (post_id) => {
    return function (dispatch, getState, { history }) {
        const likeDB = firestore.collection("like");
        const user_info = getState().user.user;

        let like = {
            post_id: post_id,
            user_id: user_info.uid
        };

        // firestore에 코멘트 정보를 넣어요!
        likeDB.add(like).then((doc) => {
            const postDB = firestore.collection("post");
            like = { ...like, id: doc.id };
            //문서 id추가
            const post_list = getState().post.list;
            const post_index = post_list.findIndex((b) => {
              return b.id === post_id;
            })
            const post_completed = getState().post.list[post_index].completed
           
            const post = getState().post.list.find((l) => l.id === post_id);
            //   firestore에 저장된 값을 +1해줍니다!
            const increment = firebase.firestore.FieldValue.increment(1);
            const decrement = firebase.firestore.FieldValue.increment(-1);
            // post에도 comment_cnt를 하나 플러스 해줍니다.
          
            if (post_completed === true) {
              postDB
              .doc(post_id)
              .update({ comment_like: increment, completed: false })
              .then((_post) => {
                  dispatch(addLike(post_id));
                  // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
                  if (post) {
                      dispatch(
                          postActions.editPost(post_id, {
                              comment_like: parseInt(post.comment_cnt) + 1,
                          })
                      );
                  }
              });
            } else {
              postDB
              .doc(post_id)
              .update({ comment_like: decrement, completed: true })
              .then((_post) => {
                  dispatch(addLike(post_id));
                  // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
                  if (post) {
                      dispatch(
                          postActions.editPost(post_id, {
                              comment_like: parseInt(post.comment_cnt) - 1,
                          })
                      );
                  }
              });
            }
            
        });
    };
};



export default handleActions(
    {
        [ADDLIKE]: (state, action) =>
            produce(state, (draft) => {
                // // comment는 딕셔너리 구조로 만들어서,
                // // post_id로 나눠 보관합시다! (각각 게시글 방을 만들어준다고 생각하면 구조 이해가 쉬워요.)
                // draft.list[action.payload.post_id] = action.payload.comment_list;
            }),
    
    },
    initialState
);

const actionCreators = {
   
    addLikeFB,
};

export { actionCreators };