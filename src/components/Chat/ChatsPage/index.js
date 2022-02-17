import { ChatEngine } from 'react-chat-engine';
import { useSelector } from 'react-redux';

export const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;

const ChatsPage = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
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
  );
};

export default ChatsPage;
