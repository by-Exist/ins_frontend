import { Card } from 'antd';
import React from 'react';
import Suggestion from './Suggestion';

function SuggestionList() {
  return <div>
    <Card title="Suggestions for you" size="small">
      {/* Suggestion from people you follow will show up here. */}
      <Suggestion />
      <Suggestion />
      <Suggestion />
      <Suggestion />
      <Suggestion />
    </Card>
  </div>
}

export default SuggestionList