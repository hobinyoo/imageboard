import React from 'react';
import { Route } from 'react-router-dom';
import Post from '../components/Post'


const PostList = () => {
    return (
        <React.Fragment>
          <Route path="/" exact component={Post} />
        </React.Fragment>
      );
}


export default PostList;
