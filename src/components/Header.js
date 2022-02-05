import React from "react";
import { Grid, HeaderText, Button } from "../elements";

import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <React.Fragment>
         <Grid is_flex padding="4px 16px" bg="white" >
        <Grid width="45%" center>
          <HeaderText margin="0px" bold size="24px"
           _onClick={() => {
            history.push("/")
          }} >
            Image-Board
          </HeaderText>
        </Grid>

        <Grid is_flex width="45%">
          <Button
            text="내정보"
            _onClick={() => {
              history.push("/login")
            }}
          ></Button>
          <Button text="알림" _onClick={() => {
              history.push('/noti');
            }}></Button>
          <Button text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}></Button>
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px" bg="white" >
        <Grid width="30%" center>
        <HeaderText margin="0px" bold size="24px"
           _onClick={() => {
            history.push("/")
          }} >
            Image-Board
          </HeaderText>
        </Grid>

        <Grid is_flex width="30%">
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login")
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup")
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;