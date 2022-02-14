/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import UserList from '../UserList';
import { CloseCreateChannel } from '../../../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name"
      />
      <p>Add Members</p>
    </div>
  );
};

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` },
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };
  const deleteChannel = async (event) => {
    event.preventDefault();

    await channel.delete();
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <button
        type="button"
        className="edit-channel__button-wrapper"
        onClick={updateChannel}
      >
        <p>Save Changes</p>
      </button>
      <button
        type="button"
        className="edit-channel__button-wrapper"
        onClick={deleteChannel}
      >
        <p>Delete Channel</p>
      </button>
    </div>
  );
};

export default EditChannel;
