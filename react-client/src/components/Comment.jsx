import React from 'react';

const Comment = props => (
  <div className="comment">
    <h2 className="author">{props.author}</h2>
    {props.text}
  </div>
);

export default Comment;
