import React from "react";
import { Button, Grid, Input, Text, ListGrid } from "../elements";
import { setCookie } from "../shared/Cookie";
import {actionCreators as userActions} from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  

    const changeId = (e) => {
        setId(e.target.value);
    }

    const changeUserName = (e) => {
      setUserName(e.target.value);
    }
    
    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const changePwdCheck = (e) => {
      setPwdCheck(e.target.value);
    }
  
 

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    
    if (pwd !== pwd_check) {
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };

    return (
        <React.Fragment>
            <ListGrid width="50%" margin="auto">
                <Grid>
                    <Text type="heading" size="20px" bold>회원가입하기</Text>
                </Grid>
                <Grid padding={16} margin="0px 0px 20px 0px">
                    <Input value={id} _onChange={changeId} placeholder="아이디를 입력하세요." label="아이디"/>
                    <Input value={user_name} _onChange={changeUserName} placeholder="닉네임을 입력해주세요." label="닉네임" />
                    <Input value={pwd} _onChange={changePwd} type="password" placeholder="비밀번호를 입력하세요." label="패스워드" />
                    <Input value={pwd_check} _onChange={changePwdCheck} type="password" placeholder="비밀번호를 다시 입력해주세요." label="패스워드 확인" />
                    
                </Grid>

                <Button 
                _onClick={() => {
                    console.log("회원가입했어!");
                    signup();
                  }}>회원가입하기</Button>
            </ListGrid>

        </React.Fragment>
    )
}

export default Signup;

// import React from "react";
// import { Grid, Text, Input, Button, ListGrid } from "../elements";

// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

// const Signup = (props) => {
//   const dispatch = useDispatch();

//   const [id, setId] = React.useState("");
//   const [pwd, setPwd] = React.useState("");
//   const [pwd_check, setPwdCheck] = React.useState("");
//   const [user_name, setUserName] = React.useState("");
  
//   const signup = () => {
//     if (id === "" || pwd === "" || user_name === "") {
//       window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
//       return;
//     }

//     if(!emailCheck(id)){
//       window.alert('이메일 형식이 맞지 않습니다!');
//       return;
//     }
    
//     if (pwd !== pwd_check) {
//       return;
//     }

//     dispatch(userActions.signupFB(id, pwd, user_name));
//   };
//   return (
//     <React.Fragment>
//       <ListGrid width="50%" margin="auto">
//         <Text size="32px" bold>
//           회원가입
//         </Text>

//         <Grid padding="16px 0px">
//           <Input
//             label="아이디"
//             placeholder="아이디를 입력해주세요."
//             _onChange={(e) => {
//               setId(e.target.value);
//             }}
//           />
//         </Grid>

//         <Grid padding="16px 0px">
//           <Input
//             label="닉네임"
//             placeholder="닉네임을 입력해주세요."
//             _onChange={(e) => {
//               setUserName(e.target.value);
//             }}
//           />
//         </Grid>

//         <Grid padding="16px 0px">
//           <Input
//             label="비밀번호"
//             placeholder="비밀번호를 입력해주세요."
//             _onChange={(e) => {
//               setPwd(e.target.value);
//             }}
//           />
//         </Grid>

//         <Grid padding="16px 0px">
//           <Input
//             label="비밀번호 확인"
//             placeholder="비밀번호를 다시 입력해주세요."
//             _onChange={(e) => {
//               setPwdCheck(e.target.value);
//             }}
//           />
//         </Grid>

//         <Button text="회원가입하기" _onClick={signup}></Button>
//       </ListGrid>
//     </React.Fragment>
//   );
// };

// Signup.defaultProps = {};

// export default Signup;