import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faPlusCircle, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <div className="nav-item active">
        <FontAwesomeIcon icon={faHome} className="icon" />
        <span className="item-name">Home</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUserFriends} className="icon" />
        <span className="item-name">Friends</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
        <span className="item-name">Create</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faInbox} className="icon" />
        <span className="item-name">Inbox</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <span className="item-name">Profile</span>
      </div>
    </div>
  );
};

export default BottomNavbar;
