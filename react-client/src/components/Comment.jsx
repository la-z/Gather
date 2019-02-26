/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const Comment = ({ author, text }) => (
  <div className="comment">
    <p className="author">
      {author}: {text}
    </p>
  </div>
);

export default Comment;
