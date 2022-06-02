import React from 'react';

class Comments extends React.Component {  

    getLastComment () {
        const idx = this.props.comments.length - 1;
        const comment = this.props.comments[idx];
        return comment;
    }
    
    render () {
        const comment = this.getLastComment();
        if (this.props.comments.length === 1) {
            return (
                <div>
                    <p>
                        <strong>{comment.username}</strong> 
                        {comment.text}
                    </p>
                    <p className="timestamp">{comment.display_time}</p>
                </div>
            )
        } else if (this.props.comments.length > 1) {
            return (
                <div>
                    <button className="link">
                            View all { this.props.comments.length } comments
                    </button>
                    <p>
                        <strong>{comment.username}</strong> 
                        {comment.text}
                    </p>
                    <p className="timestamp">{comment.display_time}</p>
                </div>
            )
        } else {
            return ''
        }
    }
}

export default Comments;