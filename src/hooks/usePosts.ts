import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Post[];
      
      setPosts(postsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createPost = async (content: string, imageUrl?: string) => {
    if (!currentUser) return;

    await addDoc(collection(db, 'posts'), {
      userId: currentUser.uid,
      content,
      imageUrl: imageUrl || null,
      likes: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const toggleLike = async (postId: string) => {
    if (!currentUser) return;

    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    
    if (post?.likes.includes(currentUser.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(currentUser.uid)
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(currentUser.uid)
      });
    }
  };

  return { posts, loading, createPost, toggleLike };
};
