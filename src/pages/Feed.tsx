import React from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/Posts/PostCard';
import { Loader2 } from 'lucide-react';

const Feed: React.FC = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {posts.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-600">Be the first to share something!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
