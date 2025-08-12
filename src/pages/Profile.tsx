import React from 'react';
import { Settings, Grid, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { userProfile } = useAuth();

  const mockPosts = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            {userProfile?.photoURL ? (
              <img
                src={userProfile.photoURL}
                alt={userProfile.displayName}
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white/20">
                <span className="text-white text-2xl font-bold">
                  {userProfile?.displayName?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {userProfile?.displayName}
              </h1>
              <p className="text-gray-600 mb-3">
                {userProfile?.email}
              </p>
              <p className="text-gray-700">
                {userProfile?.bio || 'Welcome to my profile! 👋'}
              </p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 glass-button rounded-xl">
            <Settings size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{userProfile?.followers?.length || 0}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{userProfile?.following?.length || 0}</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-center space-x-8 mb-6">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-xl text-purple-600 font-medium">
            <Grid size={16} />
            <span>Posts</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-xl text-gray-600 font-medium">
            <Heart size={16} />
            <span>Liked</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {mockPosts.map((image, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden group cursor-pointer">
              <img
                src={image}
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
