"use client";

import Link from 'next/link'
import React from 'react';
import Video from '@/components/Video';
import { useTranslation } from "next-i18next";

function X_Cloud() {
  const { t } = useTranslation("common");

  return (
    <div style={{ 
      textAlign: 'center', 
      fontSize: '24px', 
      fontWeight: 'bold',
      backgroundImage: "url('/images/bg1.png')", // 背景图片路径
      backgroundSize: 'cover', // 确保图片覆盖整个容器
      backgroundRepeat: 'no-repeat', // 不重复
      backgroundPosition: 'center', // 居中显示
      minHeight: '100vh',  }}>
      <Video 
        videoSrc = '/videos/temp.mp4'
        title = "X Cloud"
        describe = {t('X_Cloud_intro')}/>
    </div>
  );
}

export default X_Cloud;
