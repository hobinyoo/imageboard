import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import PostList from './pages/PostList'
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostDetail from "./pages/PostDetail";
import Notification from "./pages/Notification";

import Header from './components/Header';
import PostWrite from './components/postWrite';
import {Grid, Button} from "./elements";
import './App.css';
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "./redux/modules/user";
import Permit from "./shared/Permit";
import {apiKey} from "./shared/firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  React.useEffect(() => {
    
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }

  }, []);
  return (
    <React.Fragment>
      <Grid>
      <Header></Header>
      <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/write/:id" exact component={PostWrite}/>
          {/* 수정을 할때는 write id값이 필요하다 */}
          <Route path="/post/:id" exact component={PostDetail}/>
          <Route path="/noti" exact component={Notification}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={() => {history.push('/write');}}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
