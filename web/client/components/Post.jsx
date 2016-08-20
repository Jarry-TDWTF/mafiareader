import React from "react";
import { getThreadColor } from '../utils';
import PostHeader from "./PostHeader"

class Post extends React.Component {
  render() {
    const {
      content,
      tid
    } = this.props.post;

    return (
      <div className="post" style={{backgroundColor:getThreadColor(tid)}}>
        <PostHeader post={this.props.post}/>
        <div className="post-content" dangerouslySetInnerHTML={{__html:content}}></div>
      </div>
    );
  }
}

export default Post;