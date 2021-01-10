import { Tooltip, Comment as AntdComment } from "antd"
import { UserOutlined } from '@ant-design/icons'
import Avatar from "antd/lib/avatar/avatar"
import React from "react"
import moment from 'moment'


function Comment({ comment }) {

  const { id, author: { nickname, avatar }, created_at, message } = comment

  return (
    <AntdComment
      // actions={actions}
      author={nickname}
      avatar={
        avatar ? <Avatar
          src={avatar}
          alt={`${nickname}'s avatar`} /> : <Avatar ><UserOutlined /></Avatar>
      }
      content={
        <p>
          {message}
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{created_at}</span>
        </Tooltip>
      }
    />
  )
}

export default Comment
