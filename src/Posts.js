import React from 'react';
import Post from './Post';
import {getHeaders} from './utils';

class Posts extends React.Component {  

    constructor(props) {
        super(props);
        this.state = { posts: null };
        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetch('/api/posts', {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: data });
            })
    }
    
    render () {
        if (!this.state.posts) {
            return (
                <div></div>  
            );
        }
        return (
            this.state.posts.map(post => {
                return (
                    <Post model={post} key={'post-' + post.id} />
                )
            })
        );     
    }
}

export default Posts;