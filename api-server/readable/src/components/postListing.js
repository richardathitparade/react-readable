
import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Post from './post';
class PostListing extends Component {
  render() {
    let posts = [];
    if(this.props.category === this.props.highlighted_category) {
      if(this.props.category === 'all' && this.props.posts && this.props.posts.length > 0){
        let counter_ = 0
        posts = this.props.posts.map(p => {
            let new_key = counter_ + 1 + '.' + p.id;
            counter_ = counter_ + 1;
            return (<Post key={new_key} id={p.id} post={p} category={this.props.category} />  );
          });
      } else if(this.props.category_posts && this.props.category_posts[this.props.category] && this.props.category_posts[this.props.category].length > 0) {
        let counter_ = 0
        posts = this.props.category_posts[this.props.category].map(p => {
          let new_key = counter_ + 1 + '.' + p.id;
          counter_ = counter_ + 1;
            return (<Post key={new_key} id={p.id} post={p}  category={this.props.category} />);
          });
      }
    }

    return ( <div version={(this.props.version + this.props.version_category)} key={this.props.key} >{posts}</div> );
  }
}
const mapStateToProps = (state) => ({
  posts: state.post.posts,
  version: state.post.version,
  version_category: state.category.version,
  categories: state.category.categories,
  category_posts: state.category.category_posts,
  highlighted_post: state.post.highlighted_post,
  highlighted_category: state.category.highlighted_category
});

export default connect(mapStateToProps, actions)(PostListing);
