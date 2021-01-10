import { Button, Card } from 'antd';
import { useAxios } from "../api";
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../store';
import Suggestion from './Suggestion';
import { RedoOutlined } from '@ant-design/icons';

function SuggestionList() {

  // FIXME: 매 입력마다 컴포넌트가 새로 고쳐지지 않고 바뀌도록만 하자.

  const { store: { jwtToken } } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: "http://127.0.0.1:8000/accounts/suggestions/",
    headers,
  });

  return <div>
    {error && <div>로딩 중 에러가 발생했습니다.</div>}
    <Button type="primary" shape="circle" icon={<RedoOutlined />} onClick={() => refetch()} />
    <Card title="Suggestions for you" size="small">
      {loading && <div>Loading...</div>}
      {userList && userList.map(suggestionUser => (
        <Suggestion
          suggestionUser={suggestionUser}
          key={suggestionUser.nickname}
          refetch={refetch}
        />
      ))}
    </Card>
  </div>
}

export default SuggestionList