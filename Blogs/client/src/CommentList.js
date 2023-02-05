import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CommentList({postId}) {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4000/posts/${postId}/comments`
      );
  
      console.log('res.data');
      console.log(res.data);
  
      setComments(res.data);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const renderedComments =
    Array.isArray(comments)?
    comments.map((comment) => {
      return <li key={comment.id}>{comment.content}</li>;
    }): null;
  
    return <ul>{renderedComments}</ul>;
}
