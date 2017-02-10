import ReactDOM from 'react-dom';
import React from 'react';
import { Link, Router, Route, IndexRoute, hashHistory } from "react-router";
import ChatBox from './components/chatBox';
import Login from './components/Login';

const app = document.getElementById("app");

class App extends React.Component {


  render() {
    const randomNumber = Math.random() >= 0.5;
    console.log(randomNumber);
    if(randomNumber) {
        this.props.history.push('/Login');
    }

    return (<div>
                {this.props.children}
              </div>);
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute path ="Login" name ="Login" component={Login}></IndexRoute>
      <Route path ="/" component={ChatBox}></Route>
    </Route>
  </Router>,
app);
