import { Avatar, Card } from 'antd';
import React from 'react'
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons'

function Post({ post }) {

    const { photo, location, caption } = post;

    return (
        <Card
            hoverable={true}
            cover={<img src={photo} alt={caption} />}
            actions={[<HeartOutlined />, <HeartFilled />]} >
            <Card.Meta
                avatar={<Avatar size='large' icon={<UserOutlined />} />}
                title={location}
                description={caption} />
        </Card>
    )
}

export default Post