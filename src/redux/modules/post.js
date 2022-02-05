import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase"

import moment from "moment";
import { actionCreators as imageActions } from "./image";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: [],
}

// 게시글(post) 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "mean0",
  //   user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  // },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents="") => {
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
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
    };
    // 잘 만들어졌나 확인해보세요!!
    // console.log(_post);
   
    // getState()로 store의 상태값에 접근할 수 있어요!
    const _image = getState().image.preview;

     // 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어줍시다! (혹시라도 중복이 생기지 않도록요!)
     const _upload = storage
     .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
     .putString(_image, "data_url");

   _upload
     .then((snapshot) => {
       snapshot.ref
         .getDownloadURL()
         .then((url) => {
           // url을 확인해봐요!
           console.log(url);
           dispatch(imageActions.uploadImage(url));
           return url;
         })
         .then((url) => {
           // return으로 넘겨준 값이 잘 넘어왔나요? :)
           // 다시 콘솔로 확인해주기!
          //  console.log(url);

           postDB
             .add({ ...user_info, ..._post, image_url: url })
             .then((doc) => {
               // 아이디를 추가해요!
               let post = { user_info, ..._post, id: doc.id, image_url: url };
               // 이제 리덕스에 넣어봅시다.
               dispatch(addPost(post));
               history.replace("/");
             })
             .catch((err) => {
               window.alert("앗! 포스트 작성에 문제가 있어요!");
               console.log("post 작성 실패!", err);
             });
         });
     })
     .catch((err) => {
       window.alert("앗! 이미지 업로드에 문제가 있어요!");
       console.log(err);
     });

    
  };
};

const getPostFB = () => {
    return function (dispatch, getState, { history }) {
      const postDB = firestore.collection("post");
  
      postDB.get().then((docs) => {
        let post_list = [];
  
        docs.forEach((doc) => {
          // 잘 가져왔나 확인하기! :)
          // 앗! DB에서 가져온 것하고 우리가 Post 컴포넌트에서 쓰는 데이터 모양새가 다르네요!
          // console.log(doc.id, doc.data());
  
          // 데이터 모양을 맞춰주자!
          let _post = doc.data();
          
          let post = {
              id: doc.id,
              user_info: {
                  user_name: _post.user_name,
                  user_profile: _post.user_profile,
                  user_id: _post.user_id,
              },
              contents: _post.contents,
              image_url: _post.image_url,
              comment_cnt: _post.comment_cnt,
              imsert_dt: _post.insert_dt
          }
  
          post_list.push(post);
        });
  
        // 리스트 확인하기!
        // console.log(post_list);
        console.log(post_list)
        dispatch(setPost(post_list));
      });
    };
  };
// reducer
export default handleActions(
    {
      [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        })
    },
    initialState
  );

  // action creator export
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
  };
  
  export { actionCreators };