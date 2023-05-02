import React, {useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState<number>(100);
    const {data: posts, isLoading, error, refetch} = postAPI.useFetchAllPostsQuery(limit);
    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation(); // Первый аргумент - функция для вызова мутации, второй - объект с нашими полями isLoading, data и тд
    // Выше в объекте через двоеточие меняем имена во избежание конфликтов и можем также использовать эти переменные
    const [removePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();

    const handleCreate = async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost);
    };

    const handleRemove = (post: IPost) => {
        removePost(post);
    };

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    };

    return (
        <div>
            <button onClick={() => refetch()}>Refetch</button>
            <button onClick={handleCreate}>Add new post</button>
            <div className="post__list">
                {isLoading && <h1>Загрузка...</h1>}
                {error && <h1>Произошла ошибка!</h1>}
                {posts?.map(post => <PostItem key={post.id} remove={handleRemove} update={handleUpdate} post={post}/>)}
            </div>
        </div>
    );
};

export default PostContainer;