import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import PostForm from './postForm';
class EditPost extends Component {
  componentDidMount() {
    if(this.props.highlighted_post === null || typeof this.props.highlighted_post === 'undefined') {
      this.props.getCategories();
      this.props.getPost(this.props.match.params.id);
    }
  }
  render() {
    let title = '';
    let author = '';
    let body  = '';
    let category  = '';
    let pf = (
        <PostForm  id='0' key='0' />
    );
    if(this.props.highlighted_post !== null && typeof this.props.highlighted_post !== 'undefined') {
       pf = (
          <PostForm
            editMode="true"
            id={this.props.highlighted_post.id}
            key={this.props.highlighted_post.id}
            version={this.props.version}
            title={this.props.highlighted_post.title}
            author={this.props.highlighted_post.author}
            body={this.props.highlighted_post.body}
            category={this.props.highlighted_post.category} />
      );
    }
    let link_bak_val = '/';
    if(this.props.match.params.from === 'details') {
      link_bak_val = '/post/' + this.props.match.params.id;
    } else {
      if(this.props.match.params.from !=='all') {
          link_bak_val = '/category/' + this.props.match.params.from;
      }
    }
      let link_back = (<Link className="back-link" to={link_bak_val}>
      <img src={'https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-2-512.png'} style={{width: '20px', height: '20px'}} />
    </Link>);
    return (
      <div version={this.props.version}>{link_back}{pf}</div>
    );
  }
}
const mapStateToProps = state => ({
  post_comments: state.comment.post_comments,
  comment: state.comment,
  posts: state.post.posts,
  version: state.post.version,
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_post: state.post.highlighted_post,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(EditPost);
