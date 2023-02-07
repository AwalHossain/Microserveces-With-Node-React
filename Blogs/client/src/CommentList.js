import React from 'react';

export default function CommentList({comments}) {
  
    const renderedComments =
    Array.isArray(comments)?
    comments.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    }): null;
  
    return <ul>{renderedComments}</ul>;
}
