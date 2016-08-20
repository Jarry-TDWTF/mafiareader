import React from "react";
import Post from './Post';

class PostList extends React.Component {


  render() {
    const {
      posts,
      topics
    } = this.props;

    const postsNodes = posts.map(p =>
      <Post post={p} key={p.pid} topicName={topics[p.tid]}/>
    );
    return (
      <div className="post-list">
        {postsNodes}
      </div>
    );
  }
}

export default PostList;