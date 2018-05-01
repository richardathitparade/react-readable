import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Comment from "./comment";
import AddButton from "./addButton";
import AddComment from "./addComment";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class PostDetails extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getPostComments(this.props.match.params.id);
  }
  state = {
    showComment: false
  };
  toggleComment() {
    this.setState({
      showComment: !this.state.showComment
    });
  }
  commentVote(id, type) {
    this.props.voteComment(id, type);
  }
  upVote(id) {
    this.props.votePost(this.props.match.params.id, "upVote");
  }
  downVote(id) {
    this.props.votePost(this.props.match.params.id, "downVote");
  }
  showPost() {
    this.props.showPost(this.props.highlighted_post);
  }
  render() {
    let deletePath ;
    if (
      this.props.highlighted_post !== null &&
      typeof this.props.highlighted_post !== "undefined"
    ) {
      deletePath = "/delete/post/" + this.props.match.params.id + "/" + this.props.highlighted_post.category;
      let dts = new Date(this.props.highlighted_post.timestamp);
      let comments = "";
      if (
        typeof this.props.post_comments !== "undefined" &&
        typeof this.props.post_comments[this.props.match.params.id] !==
          "undefined"
      ) {
        comments = this.props.post_comments[
          this.props.match.params.id
        ].map(comment => {
          return (
            <Comment
              key={comment.id}
              parentId={comment.parentId}
              onVote={this.commentVote.bind(this)}
              version={comment.version}
              id={comment.id}
              voteScore={comment.voteScore}
              body={comment.body}
              author={comment.author}
            />
          );
        });
      }

      let editPath = "/edit/post/details/" + this.props.highlighted_post.id;
      return (
        <div>
          <div>
            <Link
              className="back-link"
              to="/"
              onClick={this.showPost.bind(this)}
            >
              <img
                src={
                  "https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-2-512.png"
                }
                style={{ width: "20px", height: "20px" }}
              />
            </Link>
            <div
              version={this.props.version}
              key={this.props.highlighted_post.id}
            >
              <h1>Post: {this.props.highlighted_post.title}</h1>
              <h2> Category: {this.props.highlighted_post.category} </h2>
              <div className="post-detail" id={this.props.highlighted_post.id}>
                <div className="post-item">
                  {this.props.highlighted_post.body}
                </div>
              </div>
              <div className="post-detail">
                <div className="post-detail-item">
                  {this.props.highlighted_post.author}
                </div>
                <div className="post-detail-item">
                  Comment Count {this.props.highlighted_post.commentCount}
                </div>
                <div className="post-detail-item">{dts.toDateString()}</div>
                <div className="vote-col">
                  <div className="vote-count">
                    <div className="vote-count-item">
                      {this.props.highlighted_post.voteScore}
                    </div>
                  </div>
                  <div className="vote-count">
                    <div
                      className="vote-count-item"
                      onClick={this.upVote.bind(this)}
                    >
                      <img
                        src={
                          "https://img.clipartxtras.com/fb4e6c22bb783974ad27d2f24d2ce1c9_image-of-like-symbol-clip-art-library-clipart-facebook-like-button_900-758.jpeg"
                        }
                        style={{ width: "20px" }}
                      />
                    </div>
                    <div
                      onClick={this.downVote.bind(this)}
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
              <div className="post-detail">
                <div className="post-item">
                  <Link
                    style={{ color: "blue" }}
                    to={editPath}
                    onClick={this.showPost.bind(this)}
                  >
                    <img
                      src={
                        "https://image.freepik.com/free-icon/pencil-striped-symbol-for-interface-edit-buttons_318-50260.jpg"
                      }
                      style={{ width: "20px", height: "35px" }}
                    />
                  </Link>
                </div>
                <div className="post-item">
                  <Link style={{ color: "blue" }} to={deletePath}>
                    <img
                      src={
                        "http://ezpro.co/blog/wp-content/uploads/2014/12/red-delete-button.jpg"
                      }
                      style={{ width: "35px", height: "35px" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            {comments}
            <AddComment
              parentId={this.props.highlighted_post.id}
              toggle={this.toggleComment.bind(this)}
              show={this.state.showComment}
            />
          </div>
          <AddButton
            onClick={this.toggleComment.bind(this)}
            show={!this.state.showComment}
          />
        </div>
      );
    } else {
      return <div>Post Details</div>;
    }
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

export default connect(mapStateToProps, actions)(PostDetails);
