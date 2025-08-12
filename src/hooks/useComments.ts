import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, 'comments'), 
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Comment[];
      
      setComments(commentsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [postId]);

  const addComment = async (content: string) => {
    if (!currentUser || !postId) return;

    await addDoc(collection(db, 'comments'), {
      postId,
      userId: currentUser.uid,
      content,
      createdAt: serverTimestamp()
    });
  };

  return { comments, loading, addComment };
};
