import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPostsAndUsers} from "../actions";
import moment from "moment";


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
        <div className={'row justify-content-md-center article mt-3'} key={post.id}>
          <div className={'col col-lg-8'}>
            <h1>{post.title}</h1>
            <p>
              <small>
                {moment(post.publication_date).format('LLLL')} by {this.getUsername(post.author)}
              </small>
            </p>

            <div className={'content'}>
              <p>
                {post.content}
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
  return {posts: state.posts, users: state.users}
}

export default connect(
  mapStateToProps,
  {getPostsAndUsers}
)(Home)