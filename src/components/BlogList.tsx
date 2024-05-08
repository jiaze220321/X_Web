// /components/BlogList.tsx
"use client";

import React from "react";
import styles from "./BlogList.module.css";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface BlogListProps {
  posts: BlogPost[]; // 接受博客列表数据
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const { t } = useTranslation("common");

  // 写死的图片数组
  const images = [
    "images/Banner4.png",
    "images/Banner3.png",
    "images/Banner.png",
    "images/Banner2.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={styles.blogList}>
      <div className={styles.aboveContainer}>
        <Slider {...settings} className={styles.sliderContainer}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`image-${index}`} className={styles.sliderImage}/>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.belowContainer}>
        <h1 className={styles.heading}>{t('latest_releases')}</h1>
        <div className={styles.cardContainer}>
          {posts.map((post) => (
            <div key={post.id} className={styles.blogCard}>
              <h2>{post.title}</h2>
              <p className={styles.date}>{post.date}</p>
              <p className={styles.description}>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
