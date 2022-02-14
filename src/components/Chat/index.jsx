import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useSelector } from 'react-redux';

import ChannelListContainer from './ChannelListCont/ChannelListContainer';
import ChannelContainer from './ChannelCont/ChannelContainer';

import './styles/index.scss';
import './App.scss';

const authToken = localStorage.getItem('userToken');

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY);

const App = () => {
  const user = useSelector((state) => state.user);
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <h1>No auth</h1>;

  useEffect(() => {
    if (user) {
      client.connectUser({
        id: user.id,
        name: user.userName,
        fullName: user.fullname,
      }, authToken);
    }
  }, [user]);

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};
export default App;
