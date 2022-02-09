import React, { useState }from "react";
import { Grid, Text, Button, Image, Input, ListGrid } from "../elements";
import Upload from "../shared/Upload";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  //params 아이디 가져오기!
  const is_edit = post_id ? true : false;
  const { history } = props;
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  //post_list에서 param로 가져온 post_id 값!

  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  //usestate의 기본값은 _post.contents
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();
      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
    // 바뀐값 contents(오른쪽)을 contents란 이름으로 넘겨줌
  }
  
  const {right, left, down} = props
  const [display, Setdisplay] = useState()
  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <ListGrid width="50%" margin="auto" bg="#CFB997" >
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {is_edit ? "게시글 수정" : "게시글 작성"}
          </Text>
          <Upload />
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>
        </Grid>

        <Grid padding="10px">
        <Style>
            <input type="radio" value={right} name="rediovalues" />
            <b>{right}</b>
            <Image
              margin="10px 0px 0px 0px"
              shape="rectangle"
              width="50%"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
        </Style>
        </Grid>

        <Grid padding="10px">
        <Style>
            <input type="radio" value={left} name="rediovalues" />
            <b>{left}</b>
            <Image
              margin="10px 0px 0px 0px"
              marginLeft="auto"
              shape="rectangle"
              width="50%"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
        </Style>
        </Grid>
     
        <Grid padding="10px">
        <Style>
            <input type="radio" value={down} name="rediovalues" />
            <b>{down}</b>
            <Image
              margin="10px 0px 0px 0px"
              shape="rectangle"
              width="100%"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
        </Style>
        </Grid>

        <Grid padding="16px">
          <Input
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
        </Grid>

        <Grid padding="16px">
          {is_edit ? (
            <Button text="게시글 수정" _onClick={editPost}></Button>
          ) : (
            <Button text="게시글 작성" _onClick={addPost}></Button>
          )}
        </Grid>

      </ListGrid>
    </React.Fragment>
  );
};
PostWrite.defaultProps = {
  right: "오른쪽 이미지 왼쪽 텍스트",
  left : "왼쪽 이미지 오른쪽 텍스트",
  down : "하단에 이미지 상단에 텍스트"
}
const Style= styled.div`
  width: 100%;
  minHeight: 150px;
  boxSizing: border-box;
 
`
export default PostWrite;