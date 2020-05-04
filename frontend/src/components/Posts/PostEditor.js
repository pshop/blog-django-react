import React, {Component} from 'react';
import {Editor} from "@tinymce/tinymce-react";
import { connect } from 'react-redux'

import {postPost, editorClean, editorSave} from "../../actions";

class PostEditor extends Component {

  constructor(props) {
    super(props);
  }

  handleEditorChange = (content, editor) => {
    this.props.editorSave(this.props.title, content)
  }
  handleChange= (e) => {
    this.props.editorSave(e.target.value, this.props.content)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await this.props.postPost(this.props.title, this.props.content).then(
      this.props.editorClean()
    )

  }

  render() {

    return (
      <div className={"row form-container"}>
          <form onSubmit={this.handleSubmit} className={"post-form"}>

            <div className={"form-group"}>
              <label htmlFor={"postTitle"}>Title:</label>
              <input type={"text"}
                     className={"form-control"}
                     id={"postTitle"}
                     name={"postTitle"}
                     onChange={this.handleChange}
                     value={this.props.title}
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
                value={this.props.content}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    title : state.editor.title,
    content: state.editor.content,
  }
}

const postEditor = connect(mapStateToProps, {
editorSave, editorClean, postPost
})(PostEditor)

export {postEditor as PostEditor};