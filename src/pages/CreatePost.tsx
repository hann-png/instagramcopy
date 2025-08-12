import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Send } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(content, imageUrl || undefined);
      navigate('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full glass-input resize-none"
              required
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (optional)
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="glass-input w-full pl-12"
              />
            </div>
          </div>

          {/* Sample Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or choose from samples:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sampleImages.map((url, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImageUrl(url)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    imageUrl === url 
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview:
              </label>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                  onError={() => setImageUrl('')}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 glass-button rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <Send size={16} />
              <span>{loading ? 'Posting...' : 'Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
