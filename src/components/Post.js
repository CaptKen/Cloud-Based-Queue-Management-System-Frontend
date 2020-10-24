import React, { Component } from 'react';

const Post = (props) =>{
    const test2 = props.test;
    console.log(test2);
    return(
        <div>
            {test2}
        </div>
    )
}

export default Post;