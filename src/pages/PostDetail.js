import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { ListGrid } from "../elements";

const PostDetail = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const user_info = useSelector((state) => state.user.user)

    //id에 맞는 redux 게시글 가져오기!
    const post_list = useSelector(store => store.post.list)
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx]

    React.useEffect(() => {

        if(post) {
            return;
        }
        dispatch(postActions.getOnePostFB(id))
    }, [])
    
    
    return (
        <React.Fragment>
            {post && (
                <Post {...post} is_me={ post.user_info.user_id === user_info?.uid }/>
            )}
            {/* post가 있을때에만 */}
            <ListGrid width="50%" margin="20px auto" bg="Olive">
            <CommentWrite post_id={id} />
            <CommentList post_id={id} />
            </ListGrid>
        </React.Fragment>
    )
}

export default PostDetail;