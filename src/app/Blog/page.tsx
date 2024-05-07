"use client";

import BlogList from "../../components/BlogList"
import { useTranslation } from "next-i18next";

const blogPosts = [
  {
    id: 1,
    title: "X LAB 平台更新：新功能",
    description: "了解最新的 X LAB 平台更新中的新功能和改进。",
    date: "2024 年 4 月 25 日",
  },
  {
    id: 2,
    title: "如何使用 X Man ",
    description: "一份关于如何使用 X Man 的指南。",
    date: "2024 年 4 月 10 日",
  },
  {
    id: 3,
    title: "混合现实：挑战与最佳实践",
    description: "探索混合现实，并发现一些最佳实践。",
    date: "2024 年 3 月 20 日",
  },
  {
    id: 4,
    title: "X Edge 项目的亮点和未来规划",
    description: "深入了解 X Edge 项目的主要亮点，并了解未来的规划方向。",
    date: "2024 年 4 月 5 日",
  },
  {
    id: 5,
    title: "X Sphere 系统架构：设计与实施",
    description: "了解 X Sphere 系统架构的设计原则及如何有效实施。",
    date: "2024 年 3 月 30 日",
  },
  {
    id: 6,
    title: "混合现实与大数据：技术融合的新趋势",
    description: "探索混合现实和大数据技术融合的趋势及其潜在的影响。",
    date: "2024 年 3 月 15 日",
  },
  {
    id: 7,
    title: "智能设备在 X Man 中的应用",
    description: "介绍如何在 X Man 中有效应用智能设备和数据分析。",
    date: "2024 年 2 月 28 日",
  },
  {
    id: 8,
    title: "未来的虚拟空间交互：X LAB 的愿景",
    description: "深入了解 X LAB 对未来虚拟空间交互的展望及发展愿景。",
    date: "2024 年 2 月 10 日",
  },
  {
    id: 9,
    title: "X Edge 系统的稳定性与性能优化",
    description: "探索 X Edge 系统如何通过稳定性与性能优化来提高用户体验。",
    date: "2024 年 1 月 25 日",
  },
  {
    id: 10,
    title: "X Man 数据管理：数据存储与安全",
    description: "了解 X Man 项目中数据管理的最佳实践，包括数据存储和安全保障。",
    date: "2024 年 1 月 10 日",
  },
];

export default function BlogPage() {
  const { t } = useTranslation("common");
  return (
    <BlogList posts={blogPosts}/>
  )
}