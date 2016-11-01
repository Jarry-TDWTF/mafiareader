import React from "react";
import { getAbsoluteUrl } from '../utils';

class PostHeader extends React.Component {


  render() {
    const {
      user,
      timestampISO,
      pid
    } = this.props.post;
    return (
      <div className="pull-left post-header">
        <div className="icon pull-left">
          <a href={''}>
            <img src={getAbsoluteUrl(user.picture)}/>
          </a>
        </div>

        <small className="pull-left">
          <div>
            <strong><a href={''}>{user.username}</a></strong> on <a className="permalink" href={getAbsoluteUrl('/post/'+ pid)} target="_blank">{timestampISO}</a> said:
          </div>
        </small>
        <small className="pull-right topic-title">{this.props.topicName}</small>
      </div>);
  }
}

  export default PostHeader;