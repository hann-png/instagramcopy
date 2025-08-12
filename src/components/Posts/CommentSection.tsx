import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useComments } from '../../hooks/useComments';
import { useAuth } from '../../contexts/AuthContext';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { comments, addComment } = useComments(postId);
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await addComment(newComment);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">
                {comment.userId.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="glass rounded-lg p-3">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  User {comment.userId.slice(0, 8)}
                </p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {comment.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 glass-input py-2"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
