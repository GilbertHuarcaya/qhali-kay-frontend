import React, { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setCurrentUsers } from '../../../store/actions';

export const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;

const ChatsPage = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const currentUsers = useSelector((state) => state.currentUsers);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setCurrentUsers(dispatch);
      if (currentUsers) {
        setCurrentUser(user, currentUsers, dispatch);
      }
      /* syncUsers(); */
    }
  }, [user]);

  useEffect(() => {
    if (currentUsers && user && !currentUser) {
      setCurrentUser(user, currentUsers, dispatch);
    }
  }, [currentUsers]);

  return (
    <div>
      {currentUser ? (
        <div style={{ zIndex: '0' }}>
          { // You need the creds correct before rendering Chat Engine
          currentUser.username && currentUser.secret
          && (
          <ChatEngine
            height="calc(100vh - 64px)"
            maxHeight="90vh"
            projectID={projectID}
            userName={currentUser.username}
            userSecret={currentUser.email}
          />
          )
      }
        </div>
      ) : null}

    </div>
  );
};

export default ChatsPage;
