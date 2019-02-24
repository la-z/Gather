import React from 'react';
import Comment from './Comment';

const CommentList = props => (
  <div className="comment-list">
    {props.data.map(function(c){
      return (
        <Comment author={this.props.author} text={this.props.text} />
      );
    })}
  </div>
);

export default CommentList;
