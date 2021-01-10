import React from 'react'
import { useAppContext } from '../store';
// import useAxios from 'axios-hooks';
import { useAxios } from "../api"
import Comment from "./Comment"
import CommentNewForm from './CommentNewForm';

function CommentList({ post_id }) {

  const { store: { jwtToken } } = useAppContext()
  const headers = { Authorization: `JWT ${jwtToken}` }
  const [{ data: commentList, loading, error }, refetch] = useAxios({
    url: `http://127.0.0.1:8000/api/posts/${post_id}/comments/`,
    headers,
  });

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        {commentList && commentList.map(comment =>
          <Comment comment={comment} />
        )}
      </div >
      <div style={{ marginTop: "1rem" }}>
        {/* <Input.TextArea rows={3} type="text" name="message" placeholder="댓글 내용..." /> */}
        {jwtToken && <CommentNewForm post_id={post_id} refetch={refetch} />}
      </div>
    </>
  )
}

export default CommentList;