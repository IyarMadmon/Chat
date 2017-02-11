import ReactDOM from 'react-dom';
import React from 'react';
import { Link, Router, Route, IndexRoute, hashHistory } from "react-router";
import ChatBox from './components/chatBox';
import Login from './components/Login';

const app = document.getElementById("app");

class App extends React.Component {


  render() {
    return (<div>
                {this.props.children}
              </div>);
  }
}

function requireAuth(nextState, replaceState) {
  console.log("Iyar", new Date().getTime());
  // replaceState({ nextPathname: nextState.location.pathname }, '/login');
  // replace({
  //    pathname: '/login',
  //    state: { nextPathname: nextState.location.pathname }
  //  });
  this.context.router.replace('login');
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path ="Login" name ="Login" component={Login}></Route>
      <IndexRoute onEnter={requireAuth.bind(this)} component={ChatBox}></IndexRoute>
    </Route>
  </Router>,
app);
