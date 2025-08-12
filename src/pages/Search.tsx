import React, { useState } from 'react';
import { Search as SearchIcon, Users, Hash } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

  const mockUsers = [
    { id: '1', name: 'John Doe', username: 'johndoe', followers: 1234 },
    { id: '2', name: 'Jane Smith', username: 'janesmith', followers: 856 },
    { id: '3', name: 'Mike Johnson', username: 'mikej', followers: 2341 },
    { id: '4', name: 'Sarah Wilson', username: 'sarahw', followers: 567 },
  ];

  const mockPosts = [
    { id: '1', content: 'Beautiful sunset today! 🌅', likes: 45, comments: 12 },
    { id: '2', content: 'Just finished my morning workout 💪', likes: 23, comments: 8 },
    { id: '3', content: 'Coffee and coding ☕️', likes: 67, comments: 15 },
    { id: '4', content: 'Weekend vibes! 🎉', likes: 89, comments: 24 },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = mockPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Search</h2>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users or posts..."
            className="glass-input w-full pl-12"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'users'
                ? 'bg-white/20 text-purple-600'
                : 'hover:bg-white/10 text-gray-600'
            }`}
          >
            <Users size={16} />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'posts'
                ? 'bg-white/20 text-purple-600'
                : 'hover:bg-white/10 text-gray-600'
            }`}
          >
            <Hash size={16} />
            <span>Posts</span>
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {activeTab === 'users' ? (
            <>
              {filteredUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No users found</p>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 glass rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                        <p className="text-xs text-gray-400">{user.followers} followers</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                      Follow
                    </button>
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No posts found</p>
              ) : (
                filteredPosts.map((post) => (
                  <div key={post.id} className="p-4 glass rounded-xl">
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
