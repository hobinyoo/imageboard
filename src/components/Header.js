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

  // const [is_login, setIsLogin] = React.useState(false);
  // React.useEffect(() => {

  //   // 쿠키를 가져와요!
  //   let cookie = getCookie("user_id");
  //   // 확인해봅시다!
  //   console.log(cookie);
  //   // 쿠키가 있으면?
  //   if (cookie) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // });

  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px" bg="white">
          <Grid>
            <HeaderText margin="0px" size="24px" bold>
              Image-Board
            </HeaderText>
          </Grid>

          <Grid is_flex>
            <Button text="내정보"></Button>
            <Button text="알림"></Button>
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
      <Grid is_flex padding="4px 16px" bg="white">
        <Grid>
          <HeaderText margin="0px" size="24px" bold>
            Image-Board
          </HeaderText>
        </Grid>

        <Grid is_flex>
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