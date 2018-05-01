import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
class AddButton extends Component {
  render() {
    if(this.props.show) {
        return (<div onClick={this.props.onClick} className="lower-right-add">+</div>);
    } else {
        return (<div></div>);
    }

  }

}
const mapStateToProps = (state) => ({
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_category: state.category.highlighted_category
});
export default connect(mapStateToProps, actions)(AddButton);
