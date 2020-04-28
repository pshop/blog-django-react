import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Editor} from "@tinymce/tinymce-react";

import {postPost} from "../actions";
import {PostEditor, PostElement} from "./Posts"

class UserPage extends Component {

  state = {editorContent: "", postTitle: ""}

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
          <PostEditor initialState={this.state} postPost={this.props.postPost}/>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.users.current_user}
}


export default connect(
  mapStateToProps,
  {postPost})(UserPage)