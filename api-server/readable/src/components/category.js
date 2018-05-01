import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostListing from './postListing';
class Category extends Component {
  componentDidMount() {
    if(this.props.category === 'all') {
      this.props.getPosts();
    } else {
      this.props.getCategoryPosts(this.props.category);
    }

  }
  render() {
    let cn = (this.props.highlighted_category != null && this.props.highlighted_category === this.props.category)?"category-cell-highlighted":"category-cell";
    return(<div className={cn} key={this.props.key}  id={this.props.category} onClick={this.props.onClick}>{this.props.category}</div>)
  }
};
const mapStateToProps = (state) => ({
  post: state.post.posts,
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(Category);
