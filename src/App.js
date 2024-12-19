import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

// Mảng video với một video mẫu
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://i.pinimg.com/736x/0b/4b/37/0b4b377e424ce060bcb415aab6d54cbf.jpg',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    uploadTimestamp: 1628538624000, // Sample timestamp for the video upload time
  },
  // Video thứ 2 bị bỏ
  /*
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    uploadTimestamp: 1628538624000,
  }
  */
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Track the current video index
  const videoRefs = useRef([]);
  const [showUploadInfo, setShowUploadInfo] = useState(false);  // To track the visibility of upload info

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Điều chỉnh tỷ lệ hiển thị để kích hoạt
    };

    // Hàm xử lý khi video vào vùng nhìn thấy
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Quan sát các video để điều khiển play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // Dừng quan sát khi component bị unmount
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // Hàm xử lý khi gán ref cho từng video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Hàm xử lý cuộn chuột
  const handleMouseWheel = (event) => {
    if (event.deltaY > 0) {
      // Cuộn xuống -> chuyển sang video tiếp theo
      setCurrentVideoIndex((prevIndex) => Math.min(videos.length - 1, prevIndex + 1));
    } else {
      // Cuộn lên -> chuyển sang video trước
      setCurrentVideoIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  // Hàm xử lý khi nhấn phím mũi tên phải
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') {
      // Nhấn phím mũi tên phải -> chuyển sang video tiếp theo
      setCurrentVideoIndex((prevIndex) => Math.min(videos.length - 1, prevIndex + 1));
    }
  };

  useEffect(() => {
    // Đăng ký sự kiện cuộn chuột
    window.addEventListener('wheel', handleMouseWheel, { passive: true });
    // Đăng ký sự kiện nhấn phím
    window.addEventListener('keydown', handleKeyPress);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [videos]);

  // Display video upload info when user scrolls or presses the right arrow key
  const handleVideoUploadInfo = () => {
    setShowUploadInfo(true);  // Show upload information
    setTimeout(() => setShowUploadInfo(false), 3000); // Hide info after 3 seconds
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        {/* Duyệt qua các video và hiển thị VideoCard */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === currentVideoIndex} // Chỉ phát video đang ở vị trí hiện tại
            uploadTimestamp={video.uploadTimestamp}
            showUploadInfo={showUploadInfo} // Pass this prop to handle display of upload info
            onNavigate={handleVideoUploadInfo} // Trigger to show upload info
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
