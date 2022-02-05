import React from "react";
import { Button, Grid, Input, Text, ListGrid } from "../elements";
import { setCookie } from "../shared/Cookie";
import {actionCreators as userActions} from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";

const Login = (props) => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');

    const changeId = (e) => {
        setId(e.target.value);
    }
    
    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const login = () => {
        if(id === "" || pwd === ""){
            window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
            return;
          }
      
          if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
          }
        dispatch(userActions.loginFB(id, pwd));
    }


    return (
        <React.Fragment>
            <ListGrid width="50%" margin="auto">
                <Grid>
                    <Text type="heading" size="20px" bold>로그인 페이지</Text>
                </Grid>
                <Grid padding={16} margin="0px 0px 20px 0px">
                    <Input value={id} _onChange={changeId} placeholder="아이디를 입력하세요." label="아이디"/>
                    <Input value={pwd} _onChange={changePwd} type="password" placeholder="비밀번호를 입력하세요." label="패스워드" />
                </Grid>

                <Button 
                _onClick={() => {
                    console.log("로그인 했어!");
                    login();
                  }}>로그인</Button>
            </ListGrid>

        </React.Fragment>
    )
}

export default Login;