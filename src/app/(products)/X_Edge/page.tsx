"use client";

import Link from 'next/link'
import React from 'react';
import Video from '@/components/Video';
import { useTranslation } from "next-i18next";

function X_Edge() {
  const { t } = useTranslation("common");

  return (
    <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
      <Video 
        videoSrc = '/videos/temp.mp4'
        title = "X Edge"
        describe = {t('X_Edge_intro')}/>
    </div>
  );
}

export default X_Edge;
