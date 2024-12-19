import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeMute,
  faVolumeUp,
  faSave, // Import save icon
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import social media icons
import './FooterRight.css';

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  onNavigate, // Prop callback to navigate between videos
  url, // New prop for the video URL
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [showSharePopup, setShowSharePopup] = useState(false); // State for controlling popup visibility

  // State to track mouse drag behavior
  const [dragStartY, setDragStartY] = useState(null);

  // Function to handle 'Add User' click
  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  // Function to handle 'Like' button click
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  // Function to handle 'Mute' button click
  const handleMuteClick = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  // Function to handle mouse down (for video navigation)
  const handleMouseDown = (e) => {
    setDragStartY(e.clientY); // Save the initial Y position
  };

  // Function to handle mouse move (for video navigation)
  const handleMouseMove = (e) => {
    if (dragStartY === null) return; // If no mouse down action, exit

    const dragDistance = e.clientY - dragStartY;

    // If the user drags enough, navigate videos
    if (dragDistance > 100) {
      onNavigate('previous');
      setDragStartY(null); // Reset the state
    } else if (dragDistance < -100) {
      onNavigate('next');
      setDragStartY(null); // Reset the state
    }
  };

  // Function to handle mouse up (for video navigation)
  const handleMouseUp = () => {
    setDragStartY(null); // Reset the state
  };

  // Function to handle the 'Save' button click (copy URL)
  const handleSaveClick = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Video URL copied to clipboard!');
    }).catch((err) => {
      alert('Failed to copy URL: ', err);
    });
  };

  // Function to handle Share button click
  const handleShareClick = () => {
    setShowSharePopup(true); // Show the popup
  };

  // Function to close the Share popup
  const handleClosePopup = () => {
    setShowSharePopup(false); // Hide the popup
  };

  return (
    <div
      className="footer-right"
      onMouseDown={handleMouseDown} // Attach mouse down event
      onMouseMove={handleMouseMove} // Attach mouse move event
      onMouseUp={handleMouseUp} // Attach mouse up event
    >
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            alt="profile"
            style={{ width: '45px', height: '45px', color: 'bolson' }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: '15px', height: '15px', color: 'maroon' }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        <p>{likes}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
            onClick={() => setSaved(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={() => setSaved(true)}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} onClick={handleShareClick} />
        <p>{shares}</p>
      </div>

      <div className="sidebar-icon record">
        <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
        <p>{muted ? 'Muted' : 'Unmuted'}</p>
      </div>

      {/* Save button with icon */}
      <div className="sidebar-icon">
        <button
          onClick={handleSaveClick}
          style={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon={faSave}  // Using save icon
            style={{ width: '20px', height: '20px', marginRight: '8px' }}
          />
          Save
        </button>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div className="share-popup">
          <div className="popup-header">
            <button className="close-popup" onClick={handleClosePopup}>
              X
            </button>
          </div>
          <div className="share-options">
            <button className="share-option" onClick={() => alert("Shared on Facebook")}>
              <FontAwesomeIcon icon={faFacebook} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
              Facebook
            </button>
            <button className="share-option" onClick={() => alert("Shared on Instagram")}>
              <FontAwesomeIcon icon={faInstagram} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
              Instagram
            </button>
            <button className="share-option" onClick={() => alert("Shared on Thread")}>
              <FontAwesomeIcon icon={faTwitter} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
              Thread
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
