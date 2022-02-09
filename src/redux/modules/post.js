import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import firebase from "firebase/compat/app";
import "moment";
import moment from "moment";
import { actionCreators as imageActions } from "./image";
import { update } from "lodash";


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";
const LIKE = "LIKE";

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post, display) => ({ post, display }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const deletePost = createAction(DELETE_POST, (post_index) => ({ post_index }));
const likePost = createAction(LIKE, (post_index, completed, comment_like) => ({ post_index, completed, comment_like }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  //무한스크롤하려면 페이징을 해야한다
  is_loading: false,
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "mean0",
  //   user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  // },
  image_url: "",
  contents: "",
  comment_cnt: 0,
  comment_like: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  completed: false,
  display: ""
};

const commentLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {

    const post_list = getState().post.list;
    const post_index = post_list.findIndex((b) => {
      return b.id === post_id;
    })
    const post_completed = getState().post.list[post_index].completed

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);

    const post = getState().post.list.find((l) => l.id === post_id);
  
    const postDB = firestore.collection("post");
 
    if (post_completed === false) {
      postDB
      .doc(post_id)
      .update({ comment_like: increment, completed:false })
      .then(()=>{
        dispatch(
          likePost(_post_idx, post_completed, {
            comment_like: parseInt(post.comment_like) + 1,
            completed: true
          })
        );
      })
    }
    else {
      postDB
      .doc(post_id)
      .update({ comment_like: decrement, completed:true})
      .then(()=>{
        dispatch(
          likePost(_post_idx, post_completed, {
            comment_like: parseInt(post.comment_like) - 1,
            completed: false
          })
        );
      })
    }
  }
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {

    const postDB = firestore.collection("post");
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);

    postDB
      .doc(post_id)
      .delete()
      .then(() => {
        dispatch(deletePost(_post_idx));
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
};

// dispatch(postActions.editPostFB(post_id, {contents: contents}));
// 바뀐값 contents(오른쪽)을 contents란 이름으로 post에 넘겨줌
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];



    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

const addPostFB = (contents = "", display) => {
  return function (dispatch, getState, { history }) {
    
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      display: display,
    };

    const _image = getState().image.preview;

    console.log(_image);
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
    console.log(_upload)
    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post,display));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {

    // state에서 페이징 정보 가져오기
    let _paging = getState().post.paging;

    // 시작정보가 기록되었는데 다음 가져올 데이터가 없다면? 앗, 리스트가 끝났겠네요!
    // 그럼 아무것도 하지말고 return을 해야죠!
    if (_paging.start && !_paging.next) {
      return;
    }

    // 가져오기 시작~!
    dispatch(loading(true));

    //is_loading를 false에서 true로 바꿔줘야함!
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc")

    // 시작점 정보가 있으면? 시작점부터 가져오도록 쿼리 수정!
    if (start) {
      query = query.startAt(start);
    }

    // 사이즈보다 1개 더 크게 가져옵시다. 
    // 3개씩 끊어서 보여준다고 할 때, 4개를 가져올 수 있으면? 앗 다음 페이지가 있겠네하고 알 수 있으니까요.
    // 만약 4개 미만이라면? 다음 페이지는 없겠죠! :)
    query
      .limit(size + 1)
      .get()
      .then(docs => {
        let post_list = [];

        //pasing 정보 만들어주기
        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          // ['commenct_cnt', 'contents', ..]
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );


          post_list.push(post);
          //현재 post_list에 4개가 들어갔다.
        });

        post_list.pop();

        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post")
    postDB.doc(id).get().then(doc => {
      console.log(doc)
      console.log(doc.data())

      let _post = doc.data();

      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {} }
      );
      dispatch(setPost([post]))
    });
  }
}


export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.post_list;
        draft.list.push(...action.payload.post_list);

        //acc 누산된 값 cur은 현재값
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex(a => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex(a => a.id === cur.id)] = cur;
            return acc;
          }
          //순번이 나옴 -1은 중복된 값이 x --> 중복처리가 끝났다
        }, [])


        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
       
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {

        draft.list = draft.list.filter((l, idx) => {
          return idx !== parseInt(action.payload.post_index)
        })
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload)
        let idx = action.payload.post_index

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
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
  getOnePostFB,
  deletePostFB,
  commentLikeFB,
};

export { actionCreators };