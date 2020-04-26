import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Editor} from "@tinymce/tinymce-react";

import {postPost} from "../actions";

class UserPage extends Component {

  store = {postContent: "", postTitle:""}

  handleEditorChange = (content, editor) => {
    this.setState({editorContent: content})
  }
  handleChange= (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postPost(this.state.postTitle, this.state.postContent)
  }

  render() {
    return (
      <div className={'container mt-3'}>
        <div className={"row justify-content-md-center"}>
          <h1>User page</h1>
        </div>
        <div className={"row form-container"}>
          <form onSubmit={this.handleSubmit} className={"post-form"}>

            <div className={"form-group"}>
              <label htmlFor={"postTitle"}>Title:</label>
              <input type={"text"}
                     className={"form-control"}
                     id={"postTitle"}
                     name={"postTitle"}
                     onChange={this.handleChange}
              />
            </div>

            <div className={"form-group"}>
              <label>Content:</label>
              <Editor
                apiKey="evs6f7rd4cu933onndtg9sw3423h56syu8id6air7yf0o8db"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={this.handleEditorChange}
                textareaName={"postContent"}
              />
            </div>

            <div className={"form-group"}>
              <button
                type="button"
                className="btn btn-success "
                onClick={this.handleSubmit}>
                Publier
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}


export default connect(
  mapStateToProps,
  {postPost})(UserPage)