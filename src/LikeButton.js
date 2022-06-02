import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    toggleLike() {
        if (this.props.likeId) {
            this.unlike();
        } else {
            this.like();
        }
    }

    like() {
        fetch(`/api/posts/likes`, {
                headers: getHeaders(),
                method: 'POST',
                body: JSON.stringify({ post_id: this.props.postId })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.requeryPost();
            })
    }

    unlike() {
        fetch(`/api/posts/likes/${this.props.likeId}`, {
                headers: getHeaders(),
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                this.requeryPost();
            })
    }

    render () {
        const likeId = this.props.likeId;
        return (
            <button role="switch"
                className="like" 
                aria-label="Like Button" 
                aria-checked={likeId ? true : false}
                onClick={this.toggleLike}>
                <i className={likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        ) 
    }
}

export default LikeButton;