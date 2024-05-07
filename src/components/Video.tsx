// /components/Video.tsx
import React, { useRef, useState } from "react";
import styles from "./Video.module.css";

interface CustomVideoProps {
    videoSrc: string;
    title: string;
    describe: string;
    width?: number;
}

const Video: React.FC<CustomVideoProps> = ({ videoSrc, title, describe, width = 600 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={styles.videoContainer}>
      <div onClick={handlePlayPause}>
        {/* {!isPlaying && (
          <img src="../images/3DSphere.jpg" alt="Video Thumbnail" className={styles.thumbnail} />
        )} */}
        {!isPlaying && <button className={styles.playButton}>►</button>}
      </div>

      <video ref={videoRef} className={styles.videoElement} controls={isPlaying} width="600">
        <source src={videoSrc} type="video/mp4" />
        您的浏览器不支持视频标签。
      </video>

      <div className={styles.videoInfo}>
        <h3>{title}</h3>
        <p>{describe}</p>
      </div>
    </div>
  );
};

export default Video;
