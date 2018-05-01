import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class DeleteModal extends Component {
  closeModal() {
    this.props.closeModal();
  }
  deletePost() {
    this.props.deletePost(this.props.match.params.id);
    this.closeModal();
  }
  deleteComment() {
    this.props.deleteComment(this.props.match.params.id);
    this.closeModal();
  }
  render() {
    let back_path = '/post/' + this.props.match.params.parentId;
    let back_path_no = back_path;
    let onClickConfirm = this.deleteComment;
    if(this.props.match.params.type === 'post') {
       back_path = '/category/' + this.props.match.params.parentId ;
       if(this.props.match.params.parentId === 'all') {
         back_path = '/';
       }
       back_path_no = '/post/' + this.props.match.params.id;
       onClickConfirm = this.deletePost;
    }
    return (
      <div className="delete-modal">
        <div className="delete-modal-row">
          Are  you sure you want to delete this {this.props.match.params.type}?
        </div>
        <div className="delete-modal-row">
          <div className="delete-modal-item">
            <Link to={back_path} onClick={onClickConfirm.bind(this)}><button className="modal-button">Yes</button></Link>
          </div>
          <div className="delete-modal-item">
            <Link to={back_path_no} onClick={this.closeModal.bind(this)}><button className="modal-button">No</button></Link>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, actions)(DeleteModal);
