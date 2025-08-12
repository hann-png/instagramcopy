# InstaLite - Instagram-like Social Media Prototype

A minimal but complete Instagram-like social media prototype built with React, TypeScript, Firebase, and TailwindCSS featuring a beautiful glassmorphism design.

## Features

### Core Functionality
- **Authentication**: Email/password and Google sign-in
- **Posts**: Create posts with text content and optional image URLs
- **Interactions**: Like/unlike posts with live like count
- **Comments**: Comment system with lazy-loaded comment threads
- **Profile**: User profile pages with posts grid and follow/unfollow functionality
- **Search**: User search by display name prefix
- **Notifications**: Notification center for likes, comments, and follows
- **Real-time Updates**: Live feed updates using Firestore onSnapshot

### Design
- **Glassmorphism Theme**: Beautiful frosted glass UI with backdrop blur effects
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Modern Typography**: Inter font for clean, readable text
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessible**: High contrast and keyboard navigation support

## Tech Stack

- **Frontend**: React 18, TypeScript, React Router
- **Styling**: TailwindCSS with custom glassmorphism components
- **Backend**: Firebase (Authentication + Firestore)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest (configured)

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── AuthForm.tsx          # Login/signup form
│   ├── Layout/
│   │   └── Navbar.tsx            # Navigation bar
│   └── Posts/
│       ├── PostCard.tsx          # Individual post component
│       └── CommentSection.tsx    # Comments for posts
├── contexts/
│   └── AuthContext.tsx           # Authentication context
├── hooks/
│   ├── usePosts.ts              # Posts management hook
│   └── useComments.ts           # Comments management hook
├── pages/
│   ├── Feed.tsx                 # Main feed page
│   ├── CreatePost.tsx           # Create new post
│   ├── Search.tsx               # User/post search
│   ├── Profile.tsx              # User profile
│   └── Notifications.tsx        # Notifications center
├── types/
│   └── index.ts                 # TypeScript type definitions
├── firebase.ts                  # Firebase configuration
├── App.tsx                      # Main app component
└── main.tsx                     # App entry point
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd instalite
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google providers
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in test mode
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon
   - Copy the config object

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 4. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Posts are readable by all authenticated users
    // Only the author can write/update their posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Comments are readable by all authenticated users
    // Only the author can write their comments
    match /comments/{commentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Notifications are only accessible by the recipient
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 5. Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Demo Data Seed Script

To populate your app with demo data, you can use the browser console after signing in:

```javascript
// Add sample posts
const samplePosts = [
  {
    content: "Beautiful sunset today! 🌅 Nature never fails to amaze me.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
  },
  {
    content: "Just finished my morning workout 💪 Feeling energized!",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop"
  },
  {
    content: "Coffee and coding ☕️ Perfect way to start the day",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
  }
];

// This would be run in the browser console after authentication
samplePosts.forEach(async (post) => {
  await window.createPost(post.content, post.imageUrl);
});
```

## Testing

Run the test suite:

```bash
npm test
```

Example unit tests are included for:
- Authentication logic
- Post creation functionality
- Comment system

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Key Features Explained

### Glassmorphism Design
- Semi-transparent containers with `backdrop-filter: blur(10px)`
- RGBA backgrounds for subtle transparency
- Soft shadows and subtle borders
- Light color scheme with high contrast text

### Real-time Updates
- Uses Firestore's `onSnapshot` for live data updates
- Posts and comments update in real-time across all connected clients

### Authentication
- Email/password authentication with form validation
- Google OAuth integration
- Persistent authentication state
- User profile creation and management

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or as a starting point for your own social media application.
