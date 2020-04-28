import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPostsAndUsers} from "../actions";
import moment from "moment";

import {PostElement} from "./Posts"


class Home extends Component {

  componentDidMount() {
    this.props.getPostsAndUsers();
  }

  getUsername = (userId) => {
    const user = this.props.users.find(user => user.pk === userId)
    if (user){
      return user.username
    }else{
      return '...'
    }
  }

  renderPosts = () => {
    return this.props.posts.map(post => {
      return (
        <PostElement post={post} username={this.getUsername(post.author)} key={post.id}/>
      )
    })
  }

  render() {
    return (
      <div className={'container'}>
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {posts: state.posts.allPosts, users: state.users.users_list}
}

export default connect(
  mapStateToProps,
  {getPostsAndUsers}
)(Home)