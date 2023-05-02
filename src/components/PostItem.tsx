import React from 'react';
import {IPost} from "../models/IPost";

interface PostItemProps {
    post: IPost;
    update: (post: IPost) => void;
    remove: (post: IPost) => void;
}

const PostItem: React.FC<PostItemProps> = ({post, update, remove}) => {
    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation(); // Предотвращаем всплытие нажатия на DIV, так как к div привязано событие изменения
        remove(post);
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const title = prompt() || '';
        update({...post, title})
    }

    return (
        <div className='post' onClick={handleUpdate}>
            {post.id} {post.title} {post.body}
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default PostItem;