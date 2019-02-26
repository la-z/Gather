import React from 'react';
import Comment from './Comment.jsx';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    {comments.map(comment => <Comment author={comment.User.username} text={comment.body} />)}
  </div>
);

export default CommentList;
