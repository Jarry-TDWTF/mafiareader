import React from "react";

class Post extends React.Component {


  render() {
    const {
      user,
      content,
      timestampISO
    } = this.props.post;

    return (
      <div className="post">
        <div>{user.username}</div>

        <div dangerouslySetInnerHTML={{__html:content}}></div>
      </div>
    );
  }
}

export default Post;