'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts/fetch');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const items = posts.map(post => ({
    title: post.title,
    description: post.content.substring(0, 100) + '...', // Shortened content
    link: `/post/${post.id}`,
  }));

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <h1 className="text-neutral-600 dark:text-neutral-200 text-2xl font-bold">Blog Posts</h1>
      <HoverEffect items={items} />
      <Link href="/new">
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Create Post
        </button>
      </Link>
    </div>
  );
};

export default HomePage;