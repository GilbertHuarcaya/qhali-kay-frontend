/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';
import { useSelector } from 'react-redux';

import { getOrCreateChat } from './getOrCreateChat';

export const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;

const Chat = ({ seller }) => {
  const didMountRef = useRef(false);
  const currentUser = useSelector((state) => state.currentUser);
  const [chat, setChat] = useState(null);
  const [headers, setHeaders] = useState({
    'Project-ID': projectID,
    'User-Name': currentUser.username,
    'User-Secret': currentUser.email,
  });

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      const data = {
        usernames: [currentUser.username, seller.username],
        is_direct_chat: true,
      };
      getOrCreateChat(headers, data, (chat) => setChat(chat));
    }
  });

  if (chat === null) return <div />;

  return (
    <div style={{ width: '100%' }}>
      <ChatEngineWrapper>
        <Socket
          projectID={headers['Project-ID']}
          userName={headers['User-Name']}
          userSecret={headers['User-Secret']}
        />

        <ChatFeed activeChat={chat.id} />
      </ChatEngineWrapper>
    </div>
  );
};

export default Chat;
