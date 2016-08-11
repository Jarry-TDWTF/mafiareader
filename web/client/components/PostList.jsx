import React from "react";
import Post from './Post';

class PostList extends React.Component {


  render() {
    const {
      posts
    } = this.props;

    const postsNodes = posts.map(p =>
      <Post post={p} key={p.pid}/>
    );
    return (
      <div className="postList">
        {postsNodes}
      </div>
    );
  }
}

export default PostList;