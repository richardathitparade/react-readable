import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
class FileNotFound extends Component {
  render() {
        return (<div>404 Post Not Found</div>);
  }

}
const mapStateToProps = (state) => ({
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_category: state.category.highlighted_category
});
export default connect(mapStateToProps, actions)(FileNotFound);
