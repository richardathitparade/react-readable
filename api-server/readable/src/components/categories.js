import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Category from "./category";
import PostListing from "./postListing";
import AddButton from "./addButton";
import PostForm from "./postForm";
import sortBy from "sort-by";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
class Categories extends Component {

  componentDidMount() {
    this.props.getCategories();
    if(this.props.posts.length === 0) {
      this.props.getCategoryPosts((this.props.match.params.category || "all"));
    }
    this.clickCategory({
      target: { id: (this.props.match.params.category || "all") }
    });
  }
  clickCategory(e) {
    this.props.showCategory(e.target.id);
  }
  clickSort(e) {
    this.sortPosts(e.target.id);
  }
  sortPosts(sb) {
    this.props.posts.sort(sortBy(sb));
    let $this = this;
    Object.keys(this.props.category_posts).forEach(function(id) {
      $this.props.category_posts[id].sort(sortBy(sb));
    });
    this.props.refreshPosts(
      this.props.posts,
      this.props.category_posts,
      sb
    );
  }
  render() {
    let cat_posts = this.props.categories.map(category => {
      return <PostListing key={category.name} category={category.name} />;
    });
    cat_posts.push(<PostListing key="all" category="all" />);
    let cats = this.props.categories.map(category => {
      return (
        <Link
          to={"/category/" + category.name}
          key={category.name}
          onClick={this.clickCategory.bind(this)}
        >
          <Category key={category.name} category={category.name} />
        </Link>
      );
    });
    cats.push(
      <Link to={"/"} key="all" onClick={this.clickCategory.bind(this)}>
        <Category category="all" />
      </Link>
    );
    let empty_span = <span />;
    let sort_img_src = (
      <img
        src={"http://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png"}
        style={{ width: "20px" }}
      />
    );
    let title_html = empty_span;
    let author_html = empty_span;
    let comment_count_html = empty_span;
    let timestamp_html = empty_span;
    let vote_score_html = empty_span;
    let details_html = empty_span;

    if (this.props.sortBy == "title") {
      title_html = sort_img_src;
    } else if (this.props.sortBy == "author") {
      author_html = sort_img_src;
    } else if (this.props.sortBy == "commentCount") {
      comment_count_html = sort_img_src;
    } else if (this.props.sortBy == "timestamp") {
      timestamp_html = sort_img_src;
    } else if (this.props.sortBy == "voteScore") {
      vote_score_html = sort_img_src;
    }
    return (
      <div version={this.props.version}>
        <PostForm />
        <h1>Categories</h1>
        <div className="category-grid">{cats}</div>
        <div>
          <div className="post-col-header">
            <div
              id="title"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              Title {title_html}
            </div>
            <div
              id="author"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              Author {author_html}
            </div>
            <div
              id="commentCount"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              Comments {comment_count_html}
            </div>
            <div
              id="timestamp"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              Date {timestamp_html}
            </div>
            <div
              id="voteScore"
              className="vote-col-header"
              onClick={this.clickSort.bind(this)}
            >
              Vote {vote_score_html}
            </div>
            <div
              id="details"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              {" "}
              {details_html}
            </div>
            <div
              id="edit_details"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              {" "}
              {details_html}
            </div>
            <div
              id="delete"
              className="post-item-header"
              onClick={this.clickSort.bind(this)}
            >
              {" "}
              {details_html}
            </div>
          </div>
          {cat_posts}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.post.posts,
  post_header: state.post.post_header,
  version: state.post.version,
  sortBy: state.post.sortBy,
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(Categories);
