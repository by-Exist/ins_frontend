import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { axiosInstance as axios } from "../api"
import { useAppContext } from '../store';
import "./Suggestion.scss"

function Suggestion({ suggestionUser, refetch }) {

  const { username, nickname, avatar, already_following } = suggestionUser;
  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };


  const handleFollow = () => {
    const data = { username }
    const config = { headers }
    axios.post("/accounts/follow/", data, config)
      .then(res => {
        console.log("성공");
        refetch()
      })
      .catch(err => {
        console.log("실패");
        console.log(err);
        console.log(err.response);
      })
  }
  return (
    <div className="suggestion" key={nickname}>
      <div className="avatar">
        {avatar ? <Avatar size='small' src={avatar} key={nickname + "'s avatar"} /> : <UserOutlined />}
      </div>
      <div className="username">
        {nickname}
      </div>
      <div className="action">
        {already_following
          ? "팔로잉 중"
          : <Button size="small" onClick={handleFollow}>Follow</Button>}
      </div>
    </div>
  )
}

export default Suggestion