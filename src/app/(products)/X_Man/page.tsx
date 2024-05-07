"use client";

import Link from 'next/link'

import React from 'react';

import Video from '@/components/Video';

function X_Man() {
  return (
    <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
      <Video 
        videoSrc = '/videos/temp.mp4'
        title = "X Man"
        describe = 'X Man description'/>
    </div>
  );
}

export default X_Man;
