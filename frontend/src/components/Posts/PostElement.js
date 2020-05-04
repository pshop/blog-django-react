import React, {Component} from 'react';
import moment from "moment";


class PostElement extends Component {

  render() {

    const {publication_date, title, content} = this.props.post
    const username = this.props.username
    return (
      <div className={"row justify-content-md-center"}>
        <div className={'col col-lg-8 article mt-3'}>
          <h1>{title}</h1>
          <p>
            <small>
              {moment(publication_date).format('LLLL')} by {username}
            </small>
          </p>
          <div className={'content'}>
            <div dangerouslySetInnerHTML={{__html: content}}>
            </div>
          </div>
          <div className={'badges'}>
            <span className="badge badge-success">new</span>
            <span> </span>
            <span className="badge badge-primary">Lifestyle</span>
          </div>
        </div>
      </div>
    )
  }
}

export {PostElement}