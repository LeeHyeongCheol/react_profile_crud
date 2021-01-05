import React, { Component }  from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Home from './router/Home';
import Notice from './router/Notice';
import Login from './router/Login';
import NoticeCreate from './router/NoticeCreate';
import NoticeDelete from './router/NoticeDelete';
import NoticeUpdate from './router/NoticeUpdate';
import NoticeRead from './router/NoticeRead';
import { Notifications } from 'react-push-notification';


class App extends Component { //라우팅을 설정해놨습니다.

  render(){
      return (
        <div>
          <BrowserRouter>
          <Notifications />
          <Route exact path="/" component={Home}/>
          <Route exact path="/Notice" component={Notice}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/NoticeCreate" component={NoticeCreate}/>
          <Route exact path="/NoticeDelete" component={NoticeDelete}/>
          <Route exact path="/NoticeUpdate" component={NoticeUpdate}/>
          <Route path="/NoticeRead" component={NoticeRead}/>
          </BrowserRouter>
        </div>
      )
  }
};

export default App;



