import React, {Component} from 'react';
import moment from "moment";


class PostElement extends Component {

  render() {

    const {publication_date,title, content} = this.props.post
    const username = this.props.username

    return (
        <div className={'row justify-content-md-center article mt-3'}>
          <div className={'col col-lg-8'}>
            <h1>{title}</h1>
            <p>
              <small>
                {moment(publication_date).format('LLLL')} by {username}
              </small>
            </p>
            <div className={'content'}>
              <p>
                {content}
              </p>
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