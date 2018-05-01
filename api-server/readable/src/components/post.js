import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class Post extends Component {
  componentDidMount() {
    this.props.getPostComments(this.props.id);
  }
  upVote(id) {
    this.props.votePost(this.props.id, "upVote");
  }
  downVote(id) {
    this.props.votePost(this.props.id, "downVote");
  }
  showPost() {
    this.props.showPost(this.props.post);
  }
  render() {

    let deletePath = '/delete/post/'+ this.props.id + '/' + this.props.category;
    if (this.props.highlighted_post !== null) {
      <Link to="/">Back</Link>;
    }

    let dts = new Date(this.props.post.timestamp);

    let newPath = "/post/" + this.props.id;

    let  editPath = "/edit/post/" + this.props.category +"/" + this.props.id;
    return (
      <div>
        <div
          className="post"
          id={this.props.id}
          onClick={this.showPost.bind(this)}
        >
          <div className="post-item">{this.props.post.title}</div>
          <div className="post-item">{this.props.post.author}</div>
          <div className="post-item">{this.props.post.commentCount}</div>
          <div className="post-item">{dts.toDateString()}</div>
          <div className="vote-col">
            <div className="vote-count">
              <div className="vote-count-item">{this.props.post.voteScore}</div>
            </div>
            <div className="vote-count">
              <div className="vote-count-item" onClick={this.upVote.bind(this)}>
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
          <div className="post-item">
            <Link style={{color: 'blue'}} to={newPath} onClick={this.showPost.bind(this)}>
              Details
            </Link>
          </div>
          <div className="post-item">
              <Link style={{color: 'blue'}} to={editPath} onClick={this.showPost.bind(this)}>
              <img
                src={
                  "https://image.freepik.com/free-icon/pencil-striped-symbol-for-interface-edit-buttons_318-50260.jpg"
                }
                style={{ width: "20px", height: "35px" }}
              />
              </Link>
          </div>
          <div className="post-item">
          <Link style={{color: 'blue'}} to={deletePath}>
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
    );
  }
}
const mapStateToProps = state => ({
  posts: state.post.categories,
  highlighted_post: state.post.highlighted_post
});

export default connect(mapStateToProps, actions)(Post);
