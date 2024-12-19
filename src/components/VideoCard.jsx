import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    autoplay,
    onNavigate,
    uploadTimestamp,  // Add the timestamp for upload
    showUploadInfo, // To handle showing the upload info
  } = props;

  const videoRef = useRef(null);
  const [showUploadInfoState, setShowUploadInfoState] = useState(false);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    setShowUploadInfoState(showUploadInfo);
  }, [showUploadInfo]);

  // Display the video upload info when scrolling or pressing right arrow
  const handleScrollOrKeyPress = (e) => {
    if (e.type === 'wheel' || e.key === 'ArrowRight') {
      setShowUploadInfoState(true); // Show upload info on scroll or key press
      setTimeout(() => setShowUploadInfoState(false), 3000); // Hide info after 3 seconds
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScrollOrKeyPress);
    window.addEventListener('keydown', handleScrollOrKeyPress);

    return () => {
      window.removeEventListener('wheel', handleScrollOrKeyPress);
      window.removeEventListener('keydown', handleScrollOrKeyPress);
    };
  }, []);

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={videoRef}
        src={url}
        loop
      ></video>

      {/* The bottom controls section */}
      <div className="bottom-controls">
        <div className="footer-left">
          {/* The left part of the footer */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* The right part of the footer */}
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            url={url}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Display video upload information if showUploadInfoState is true */}
      {showUploadInfoState && (
        <div className="upload-info">
          <div className="username">{username}</div>
          <div className="description">{description}</div>
          <div className="timestamp">{`Uploaded on: ${new Date(uploadTimestamp).toLocaleDateString()}`}</div>
        </div>
      )}

      {/* Arrow to navigate between videos */}
      <div className="arrow-right" onClick={() => onNavigate()}>
        <span>&#8594;</span> {/* Right arrow */}
      </div>
    </div>
  );
};

export default VideoCard;
