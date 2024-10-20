import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const dummyPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering File Organization: Tips and Tricks',
    excerpt: 'Learn how to keep your digital workspace tidy and efficient with these file organization strategies.',
    author: 'Jane Doe',
    date: 'May 15, 2023',
    readTime: '5 min read',
    imageUrl: '/placeholder.svg?height=200&width=400',
  },
  {
    id: '2',
    title: 'The Future of Cloud Storage: What to Expect',
    excerpt: 'Explore the upcoming trends and technologies that will shape the future of cloud storage.',
    author: 'John Smith',
    date: 'May 10, 2023',
    readTime: '7 min read',
    imageUrl: '/placeholder.svg?height=200&width=400',
  },
  // Add more dummy posts as needed
];

const BlogList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {dummyPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="block hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
            <div className="flex flex-col">
              <Image src={post.imageUrl} alt={post.title} width={400} height={200} className="object-cover w-full h-56" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-[#122D4F]">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                  <span className="mx-2">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
