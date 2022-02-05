import React from 'react';
import { Route } from 'react-router-dom';
import Post from '../components/Post'
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";

const PostList = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.getPostFB());

}, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Post key={p.id} {...p} />
      })}
    </React.Fragment>
  );
}


export default PostList;
