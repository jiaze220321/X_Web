// /components/BlogList.tsx
"use client";

import React from "react";
import styles from "./BlogList.module.css";
import { useTranslation } from "next-i18next";

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

  return (
    <div className={styles.blogList}>
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
  );
};

export default BlogList;
