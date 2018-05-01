import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import logo from '../logo.svg';
import '../App.css';
import '../css/font-awesome.css';
import Categories from './categories';
import PostDetails from './postDetail';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';
import EditPost from './editPost';
import DeleteModal from './deleteModal';
class App extends Component {
  componentDidMount() {

  }
  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Readable</h1>
          </header>
          <BrowserRouter>
          <div>
          <Route exact path="/" component={Categories} />
          <Route exact path="/post/:id" component={PostDetails} />
          <Route exact path="/edit/post/:from/:id" component={EditPost} />
          <Route exact path="/delete/post/:id" component={PostDetails} />
          <Route exact path="/category/:category" component={Categories} />
          <ModalRoute component={DeleteModal} path='/delete/:type/:id/:parentId' parentPath="/" /> 
           <ModalContainer />
          </div>
        </BrowserRouter>
        </div>
      );
  }
};
export default connect(null,actions)(App);
