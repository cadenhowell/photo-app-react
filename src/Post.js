import React from 'react';
import AddComment from './AddComment';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import Comments from './Comments';
import {getHeaders} from './utils';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            isModalShowing: false
        };
        this.requeryPost = this.requeryPost.bind(this);
        //this.showModal = this.showModal.bind(this);
        //this.updateModalState = this.updateModalState.bind(this);
    }

    componentDidMount() {
        this.setState({ post: this.props.model });
    }

    requeryPost() {
        fetch(`/api/posts/${this.state.post.id}`, {
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    post: data 
                });
            });
    }
    
    render () {
        // console.log('re-rendering the post', this.state);
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                <div className="info">
                    <div className="buttons">
                        <div>
                            <LikeButton 
                                postId={post.id} 
                                likeId={post.current_user_like_id}
                                requeryPost={this.requeryPost} />
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <div>
                            <BookmarkButton 
                                postId={post.id} 
                                bookmarkId={post.current_user_bookmark_id}
                                requeryPost={this.requeryPost} />
                        </div>
                    </div>
                    <p className="likes"><strong>{ post.likes.length } { post.likes.length === 1 ? 'like' : 'likes' }</strong></p>
                    <div className="caption">
                        <p>
                            <strong>{ post.user.username }</strong> 
                            { post.caption }
                        </p>
                        <p className="timestamp">{ post.display_time }</p>
                    </div>
                    <Comments comments={post.comments}  />
                </div>
                
                <AddComment callback={this.requeryPost} postId={post.id} />
            </section> 
        );     
    }
}

export default Post;