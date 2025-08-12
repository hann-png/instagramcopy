import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useComments } from '../../hooks/useComments';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { currentUser } = useAuth();
  const { toggleLike } = usePosts();
  const { comments } = useComments(post.id);
  const [showComments, setShowComments] = useState(false);

  const isLiked = currentUser ? post.likes.includes(currentUser.uid) : false;
  const timeAgo = new Date(post.createdAt).toLocaleDateString();

  const handleLike = () => {
    toggleLike(post.id);
  };

  return (
    <div className="glass-card p-6 mb-6 animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {post.userId.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">User {post.userId.slice(0, 8)}</p>
            <p className="text-sm text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'text-red-500 bg-red-50/50' 
                : 'text-gray-600 hover:bg-white/10'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{post.likes.length}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 p-2 rounded-full text-gray-600 hover:bg-white/10 transition-all duration-200"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">{comments.length}</span>
          </button>
          
          <button className="p-2 rounded-full text-gray-600 hover:bg-white/10 transition-all duration-200">
            <Share size={20} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-white/20 pt-4">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
