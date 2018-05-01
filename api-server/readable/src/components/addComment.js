import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class AddComment extends Component {
  state = {
    author: '',
    comment: ''
  }
  updateAuthor(s) {
    this.setState({
      author: s
    });
  }
  updateComment(s) {
    this.setState({
      comment: s
    });
  }
  addNewComment() {
    this.props.addComment({
        author: this.state.author,
        body: this.state.comment,
        parentId: this.props.parentId
    })
    this.props.toggle();
    this.props.getPostComments(this.props.parentId);
    this.setState({
      author: '',
      comment: ''
    })
  }
  render() {
    if(this.props.show) {
      return (
        <div className="comment" key={this.props.id} version={this.props.version}>
          <div className="comment-item" style={{maxWidth: '10px',backgroundColor: '#ffffff', maxHeight: '20px'}}>
          @
          </div>
          <div className="comment-item" style={{backgroundColor: '#ffffff', maxHeight: '20px'}}>
            <input id="author" type="text" value={this.state.author} placeholder="author..." onChange={event => this.updateAuthor(event.target.value)} />
          </div>
          <div className="comment-item" style={{backgroundColor: '#ffffff', maxHeight: '20px'}}>
          <input id="comment" type="text"  value={this.state.comment} style={{maxHeight: '20px'}} placeholder="comment"  onChange={event => this.updateComment(event.target.value)}/>
          </div>
          <div className="vote-col">
            <div className="vote-count">
            <img
              onClick={this.addNewComment.bind(this)}
              src={
                "https://blogs.cs.st-andrews.ac.uk/routing-island/files/2012/03/1y-Save.png"
              }
              style={{ width: "30px", height: "30px" }}
            />
            </div>
            <div className="vote-count">
              <div className="vote-count-item">
                <img
                  onClick={this.props.toggle}
                  src={
                    "http://ezpro.co/blog/wp-content/uploads/2014/12/red-delete-button.jpg"
                  }
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}
const mapStateToProps = state => ({
  post_comments: state.comment.post_comments,
  posts: state.post.posts,
  version: state.comment.version,
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_post: state.post.highlighted_post,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(AddComment);
