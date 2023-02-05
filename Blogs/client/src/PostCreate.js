import axios from 'axios';
import React, { useState } from 'react';

export default function PostCreate() {

    const [title, setTitle] = useState("")

    const onSubmit = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:4001/posts",{
            title
        })
    }
  return (
    <div>
    <form onSubmit={onSubmit}>
    <div class="form-group">
        <input value={title} onChange={e=> setTitle(e.target.value)} class="form-control"  />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <button  type="submit" class="btn btn-primary">Submit</button>
    </form>

    div
    </div>
  )
}
