import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging)
 

    const { history } = props;

    React.useEffect(() => {
        if(post_list.length < 2){
           dispatch(postActions.getPostFB());
        }
        

    }, []);
  

    return (
        <React.Fragment>
          <Grid>
            {/* <Post/> */}
            <InfinityScroll
              callNext={() => {
                dispatch(postActions.getPostFB(paging.next));
              }}
              is_next={paging.next ? true : false}
              loading={is_loading}
            >
              {post_list.map((p, idx) => {
                if (p.user_info.user_id === user_info?.uid) {
                  //im_me를 post안에서는 false로하고 밖에서 조건을 줘서 나인지아닌지를 판별!
                  return (
                    <Grid
                      key={p.id}
                    >
                      <Post key={p.id} {...p} is_me />
                    </Grid>
                  );
                //로그인 했을 때와 안했을 때 분리하기!  
                } else {
                  return (
                    <Grid
                      key={p.id}
                    >
                      <Post {...p} />
                    </Grid>
                  );
                }
              })}
            </InfinityScroll>
          </Grid>
        </React.Fragment>
      );
}

export default PostList;