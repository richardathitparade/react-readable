import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class PostForm extends Component {
  state = {
    title: this.props.title,
    author: this.props.author,
    body: this.props.body,
    version: 1,
    editMode: (this.props.editMode || 'false'),
    updateCategory: 0
  };
  componentDidMount() {
    if (typeof this.props.id !== "undefined") {
      this.updateId(this.props.id);
    }
    if (typeof this.props.title !== "undefined") {
      this.updateTitle(this.props.title);
    }
    if (typeof this.props.author !== "undefined") {
      this.updateAuthor(this.props.author);
    }
    if (typeof this.props.body !== "undefined") {
      this.updateBody(this.props.body);
    }
    if (
      typeof this.props.category !== "undefined" &&
      this.props.category.trim().length > 0
    ) {
      this.setCategory(this.props.category);
    } else {
      this.setCategory("react");
    }
  }
  updateId(s) {
    this.setState({
      ...this.state,
      id: s
    });
    this.props.update_post_header(s, "id");
  }
  updateTitle(s) {
    this.setState({
      ...this.state,
      title: s
    });
    this.props.update_post_header(s, "title");
  }
  updateAuthor(s) {
    this.setState({
      ...this.state,
      author: s
    });
    this.props.update_post_header(s, "author");
  }
  updateBody(s) {
    this.setState({
      ...this.state,
      body: s
    });
    this.props.update_post_header(s, "body");
  }
  onChange(event) {
    this.setCategory(event.target.value);
  }
  addNewPost() {
    this.props
      .addPost({
        body: this.state.body,
        author: this.state.author,
        title: this.state.title,
        category: this.state.category
      })
      .then(data => {
        this.props.getCategoryPosts(this.props.highlighted_category || "all");
      });
  }
  editPost() {
    this.props.editPost({
      id: this.state.id,
      body: this.state.body,
      author: this.state.author,
      title: this.state.title,
      category: this.state.category
    });
  }
  setCategory(categoryValue) {
    if (
      typeof categoryValue !== "undefined" &&
      categoryValue.trim().length > 0
    ) {
      this.props.update_post_header(categoryValue, "category");
      this.setState({
        category: categoryValue
      });
    }
  }
  render() {
    let $this = this;
    let cats = this.props.categories.map(category => {
      return (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      );
    });
    let $category = this.state.category;
    let img_src = (<img
      className="post-item-footer-save"
      onClick={event => this.addNewPost()}
      src={
        "https://blogs.cs.st-andrews.ac.uk/routing-island/files/2012/03/1y-Save.png"
      }
      style={{ width: "35px", height: "35px" }}
    /> );
    if(this.state.editMode==='true') {
     let to_path = '/post/' + this.props.id;
          img_src = (
          <Link to={to_path} onClick={event => this.editPost()}>
              <img
          className="post-item-footer-save"
          src={
            "https://blogs.cs.st-andrews.ac.uk/routing-island/files/2012/03/1y-Save.png"
          }
          style={{ width: "35px", height: "35px" }}
        /></Link>

        );

    }
    return (
      <div
        className="post-section"
        id={this.state.id}
        key={this.state.key}
        version={this.state.version}
      >
        <div className="post-body">
          <div className="post-item-header">
            <div className="post-item-title">
              <input
                id="title"
                type="text"
                placeholder="title..."
                value={this.state.title || ""}
                onChange={event => this.updateTitle(event.target.value)}
              />
            </div>
            <div className="post-item-title">
              Category:
              <select
                onChange={event => this.onChange(event)}
                value={$category}
              >
                {cats}
              </select>
            </div>
          </div>

          <div className="post-item-body">
            <textarea
              id="body"
              placeholder="post body..."
              value={this.state.body}
              onChange={event => this.updateBody(event.target.value)}
            />
          </div>
          <div className="post-item-footer">
            <div className="post-item-footer-item">
              <input
                id="author"
                type="text"
                placeholder="@author..."
                value={this.state.author || ""}
                onChange={event => this.updateAuthor(event.target.value)}
              />
            </div>

            <div>
               {img_src}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post_header: state.post.post_header,
  highlighted_post: state.post.highlighted_post,
  categories: state.category.categories,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(PostForm);
