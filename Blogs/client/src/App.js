

import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'

export default function App() {
  return (
    <div className='container'>
        
       <h1>React Blog Page</h1> 

    <div >
        <PostCreate />
        <h3>Here goest Posts</h3>
        <PostList />
    </div>

    </div>
  )
}
