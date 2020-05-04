import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {getUserPosts, delUserPost} from "../actions";
import {PostEditor, PostElement} from "./Posts"

class UserPage extends Component {

  handleDelete = (postId) => {
    this.props.delUserPost(postId)
  }

  renderUserPosts = () => {
    return this.props.posts.map(post => {
      return (
        <div className={"blogposts-list"} key={post.id}>
          <div className={"blogpost"}>
            <PostElement post={post} username={this.props.user.username}/>
          </div>
          <div className={"row justify-content-md-center"}>
            <button type="button" className="btn btn-warning mr-3">Edit</button>
            <button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(post.id)}> Delete</button>
          </div>
        </div>

      )
    })
  }

  render() {
    return (
      <div className={'container mt-3'}>
        <div className={"row justify-content-md-center"}>
          <h1>Welcome {this.props.user.username}</h1>
        </div>
        <button className="btn btn-primary mb-3"
                type={"button"}
                data-toggle="collapse"
                data-target={"#collapseEditor"}
                aria-expanded="false"
                aria-controls="collapseEditor">
          Ajouter un post
        </button>
        <div className={"collapse"} id={'collapseEditor'}>
          <div className={"card card-body"}>
            <PostEditor/>
          </div>
        </div>
        <hr/>
        <div className={"container"}>
          {this.renderUserPosts()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.current_user,
    posts: state.posts.userPosts
  }
}


export default connect(
  mapStateToProps,
  {getUserPosts, delUserPost})(UserPage)