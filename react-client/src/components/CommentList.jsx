import React from 'react';
import Comment from './Comment.jsx';

const CommentList = props => (
  <div className="comment-list">
    {props.data.map(function(c){
      return (
        <Comment author={c.User.username} text={c.body} />
      );
    })}
  </div>
);

export default CommentList;
