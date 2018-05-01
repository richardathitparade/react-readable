import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class Comment extends Component {
  state = {
    editMode: false,
    author: '',
    body: ''
  }
  updateAuthor(s) {
    this.setState({
      author: s
    });
  }
  updateBody(s) {
    this.setState({
      body: s
    });
  }
  onChangeEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  componentDidMount() {
    const $body = this.props.body;
    const $author = this.props.author;
    this.setState({
      body: $body,
      author: $author
    })
  }
  updateExistingComment() {
    this.props.editComment({
      id: this.props.id ,
      author: this.state.author,
      body: this.state.body,
      parentId: this.props.parentId
    });
    this.props.getPostComments(this.props.parentId);
    this.onChangeEdit();
  }
  render() {
    let deletePath = '/delete/comment/'+this.props.id + '/' + this.props.parentId;
    if(this.state.editMode) {
      return (
        <div className="comment" key={this.props.id} version={this.props.version}>
          <div className="comment-item" style={{maxWidth: '10px',backgroundColor: '#ffffff', maxHeight: '20px'}}>
          @
          </div>
          <div className="comment-item" style={{backgroundColor: '#ffffff', maxHeight: '20px'}}>
            <input type="text" value={this.state.author} onChange={event => this.updateAuthor(event.target.value)} />
          </div>
          <div className="comment-item" style={{backgroundColor: '#ffffff', maxHeight: '20px'}}>
          <input type="text"  value={this.state.body} style={{maxHeight: '20px'}} onChange={event => this.updateBody(event.target.value)}/>
          </div>
          <div className="vote-col">
            <div className="vote-count">
            <img
              onClick={this.updateExistingComment.bind(this)}
              src={
                "https://blogs.cs.st-andrews.ac.uk/routing-island/files/2012/03/1y-Save.png"
              }
              style={{ width: "30px", height: "30px" }}
            />
            </div>
            <div className="vote-count">
              <div className="vote-count-item">
                <img
                  onClick={this.onChangeEdit.bind(this)}
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
      return (
        <div className="comment" key={this.props.id} version={this.props.version}>
          <div className="comment-item">
            @{this.props.author} {this.props.body}{" "}
          </div>
          <div className="vote-col">
            <div className="vote-count">
              <div className="vote-count-item">{this.props.voteScore}</div>
            </div>
            <div className="vote-count">
              <div className="vote-count-item">
                <img
                onClick={this.onChangeEdit.bind(this)}
                  src={
                    "https://image.freepik.com/free-icon/pencil-striped-symbol-for-interface-edit-buttons_318-50260.jpg"
                  }
                  style={{ width: "10px", height: "10px" }}
                />
              </div>
              <div className="vote-count-item">
              <Link style={{color: 'blue'}} to={deletePath}>
                <img
                  src={
                    "http://ezpro.co/blog/wp-content/uploads/2014/12/red-delete-button.jpg"
                  }
                  style={{ width: "10px", height: "10px" }}
                />
                </Link>
              </div>
            </div>
            <div className="vote-count">
              <div
                className="vote-count-item"
                onClick={() => {
                  this.props.onVote(this.props.id, "upVote");
                }}
              >
                <img
                  src={
                    "https://img.clipartxtras.com/fb4e6c22bb783974ad27d2f24d2ce1c9_image-of-like-symbol-clip-art-library-clipart-facebook-like-button_900-758.jpeg"
                  }
                  style={{ width: "20px" }}
                />
              </div>
              <div
                onClick={() => {
                  this.props.onVote(this.props.id, "downVote");
                }}
                className="vote-count-item"
              >
                <img
                  src={
                    "https://cdn.cultofmac.com/wp-content/uploads/2015/09/dislike-780x439.jpg"
                  }
                  style={{ width: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      );
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

export default connect(mapStateToProps, actions)(Comment);
