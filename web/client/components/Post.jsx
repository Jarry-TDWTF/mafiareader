import React from "react";
import { getThreadColor, getThreadNormalizedNumber } from '../utils';
import PostHeader from "./PostHeader"

class Post extends React.Component {
  render() {
    const {
      topicName,
      post
    } = this.props;

    return (
      <div className="post thread" style={{backgroundColor:getThreadColor(post.tid)}} data-thread={getThreadNormalizedNumber(post.tid)}>
        <PostHeader post={post} topicName={topicName}/>
        <div className="post-content" dangerouslySetInnerHTML={{__html:post.content}}></div>
      </div>
    );
  }
}

export default Post;