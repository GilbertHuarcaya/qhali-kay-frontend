/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useContext } from 'react';

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine';
import { projectID } from '../data';
import { Context } from '../data/context';

import { getOrCreateChat } from './getOrCreateChat';

const Chat = ({ seller }) => {
  const didMountRef = useRef(false);
  const { currentUser } = useContext(Context);
  const [chat, setChat] = useState(null);
  const [headers, setHeaders] = useState({
    'Project-ID': projectID,
    'User-Name': currentUser.username,
    'User-Secret': currentUser.secret,
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
