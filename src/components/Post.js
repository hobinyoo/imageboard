import React, { useState } from "react";
import { Grid, Image, Text, Button, ListGrid } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as likeActions } from "../redux/modules/like";
import styled from "styled-components";

const Post = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _display = useSelector((state) => state.post.list)

  //post id 찾기

  let idx = _display.findIndex((p) => p.id === props.id);
  const display = _display[idx].display
  
  const deletePost = () => {
    dispatch(postActions.deletePostFB(props.id))
  }

  const like = () => {
  
    dispatch(postActions.commentLikeFB(props.id))
    // dispatch(likeActions.addLikeFB(props.id))
  }
  console.log(_display[idx].completed)

  const [state, setState] = useState(true);

  const toggle = () => {
    
    setState(!state)
  }

  //"하단에 이미지 상단에 텍스트"
  if (display === "하단에 이미지 상단에 텍스트") {
    return (
      <React.Fragment>
        <ListGrid width="50%" margin="20px auto 0px auto" bg="#CFB997" >
          <Grid is_flex padding="16px">
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              {props.is_me && (<Button width="auto" padding="4px"
                //porps_is_me는 default로 지정!
                margin="4px" _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>)}
              {props.is_me && (<Button width="auto" padding="4px"
                margin="4px" _onClick={deletePost}>삭제</Button>)}
              <Text>{props.insert_dt}</Text>
            </Grid>
          </Grid>

          {/* 누르면상세페이지 */}
          <Grid key={props.id}
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}>
            <Grid padding="16px">
              <Text>{props.contents}</Text>
            </Grid>

            <Grid padding="10px">
              <Style>
                <Image
                  margin="10px 0px 0px 0px"
                  shape="rectangle"
                  width="100%"
                  src={props.image_url}
                />
              </Style>
            </Grid>
          </Grid>

          <Grid padding="16px">
            <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
            <Text margin="0px" bold>좋아요 {props.comment_like}개</Text>
            {is_login ? (
            <Button margin="0px" bold _onClick={() => {
              like()
              toggle()
            }}>{state ? `like` : `unlike`}</Button>
          ) : (
            <Button margin="0px" bold _onClick={() => {
              alert("로그인을 해주세요!")
            }}>{`like`}</Button>
          )}
          </Grid>
        </ListGrid>
      </React.Fragment>
    )
  }

  //"왼쪽 이미지 오른쪽 텍스트"
  if (display === "왼쪽 이미지 오른쪽 텍스트") {
    return (
      <React.Fragment>
        <ListGrid width="50%" margin="20px auto 0px auto" bg="#CFB997" >
          <Grid is_flex padding="16px">
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              {props.is_me && (<Button width="auto" padding="4px"
                //porps_is_me는 default로 지정!
                margin="4px" _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>)}
              {props.is_me && (<Button width="auto" padding="4px"
                margin="4px" _onClick={deletePost}>삭제</Button>)}
              <Text>{props.insert_dt}</Text>
            </Grid>
          </Grid>

          {/* 누르면 상세페이지 */}
          <Grid key={props.id}
            _onClick={() => {
              history.push(`/post/${props.id}`);
            }}>
            <Grid padding="16px">
              <Text>{props.contents}</Text>
            </Grid>
            <Grid padding="10px">
              <Style>
                <Image
                  margin="10px 0px 0px 0px"
                  shape="rectangle"
                  width="50%"
                  src={props.image_url}
                />
              </Style>
            </Grid>
          </Grid>

          <Grid padding="16px">
            <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
            <Text margin="0px" bold>좋아요 {props.comment_like}개</Text>
            {is_login ? (
            <Button margin="0px" bold _onClick={() => {
              like()
              toggle()
            }}>{state ? `like` : `unlike`}</Button>
          ) : (
            <Button margin="0px" bold _onClick={() => {
              alert("로그인을 해주세요!")
            }}>{`like`}</Button>
          )}

          </Grid>
        </ListGrid>
      </React.Fragment>
    )

  }

  //"오른쪽이미지 왼쪽 텍스트"
  return (
    <React.Fragment>
      <ListGrid width="50%" margin="20px auto 0px auto" bg="#CFB997" >
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            {props.is_me && (<Button width="auto" padding="4px"
              //porps_is_me는 default로 지정!
              margin="4px" _onClick={() => { history.push(`/write/${props.id}`) }}>수정</Button>)}
            {props.is_me && (<Button width="auto" padding="4px"
              margin="4px" _onClick={deletePost}>삭제</Button>)}
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>

        {/* 누르면 상세페이지 */}
        <Grid key={props.id}
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}>
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid padding="10px">
            <Style>
              <Image
                margin="10px 0px 0px 0px"
                marginLeft="auto"
                shape="rectangle"
                width="50%"
                src={props.image_url}
              />
            </Style>
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
          <Text margin="0px" bold>좋아요 {props.comment_like}개</Text>

          {is_login ? (
           <Button  margin="0px" bold _onClick={() => {
              like()
              toggle()
            }}>{state ? `like` : `unlike`}</Button>
          ) : (
            <Button margin="0px" bold _onClick={() => {
              alert("로그인을 해주세요!")
            }}>{`like`}</Button>
          )}
        </Grid>
      </ListGrid>
    </React.Fragment>
  );
}
// 좋아요 {props.comment_like}개
Post.defaultProps = {
  user_info: {
    user_name: "hovinee",
    user_profile: ""
  },
  image_url: "data:image/jpeg;base64,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",
  contents: "루피!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

const Style = styled.div`
  width: 100%;
  minHeight: 150px;
  boxSizing: border-box;
 
`
export default Post;