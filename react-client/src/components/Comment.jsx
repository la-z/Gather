import React from 'react';

const Comment = props => (
  <div className="comment">
    <p className="author">{props.author}
      {props.text}
    </p>
  </div>
);

export default Comment;
