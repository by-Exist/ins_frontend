import { useAxios } from "../api";
import React from 'react';
import { useAppContext } from '../store';
import Post from './Post';


function PostList() {

	const { store: { jwtToken } } = useAppContext();

	const headers = { Authorization: `JWT ${jwtToken}` };

	const [{ data: postList, loading, error }, refetch] = useAxios({
		url: "http://127.0.0.1:8000/api/posts/",
		headers,
	});

	return (
		<div>
			{postList && postList.length === 0 && <div>작성된 포스팅이 없습니다.</div>}
			{postList && postList.map(post =>
				<Post key={post.id} post={post} />
			)}
		</div>
	)
}

export default PostList;