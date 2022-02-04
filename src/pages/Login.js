import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import { setCookie } from "../shared/Cookie";
import {actionCreators as userActions} from "../redux/modules/user";
import { useDispatch } from "react-redux";

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
        dispatch(userActions.loginFB(id, pwd));
    }
    return (
        <React.Fragment>
            <Grid width="50%" margin="auto">
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


            </Grid>

        </React.Fragment>
    )
}

export default Login;