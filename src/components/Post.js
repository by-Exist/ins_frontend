import { Avatar, Card } from 'antd';
import React, { useState } from 'react'
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons'
import { axiosInstance as axios } from "../api"
import { useAppContext } from '../store';
import CommentList from "./CommentList"

function Post({ post }) {

	const { author, photo, location, caption, is_like_user } = post;
	const { nickname, avatar } = author
	const { store: { jwtToken } } = useAppContext()
	const [isLike, setIsLike] = useState(is_like_user)
	const headers = { Authorization: `JWT ${jwtToken}` }

	const handleLike = async () => {
		const apiUrl = `/api/posts/${post.id}/like/`;
		const method = isLike ? "DELETE" : "POST";
		try {
			const res = await axios({
				url: apiUrl,
				method,
				headers
			})
			console.log(res);
			setIsLike(!isLike)
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<Card
			hoverable={true}
			cover={<img src={photo} alt={caption} />}
			actions={[
				isLike ? <HeartFilled onClick={handleLike} /> : <HeartOutlined onClick={handleLike} />
			]} >
			<Card.Meta
				avatar={<Avatar size='large' icon={avatar
					? <img src={avatar} alt={`${nickname}'s avatar`} /> : <UserOutlined />} />}
				title={location}
				description={caption} />
			<CommentList post_id={post.id} />
		</Card>
	)
}

export default Post