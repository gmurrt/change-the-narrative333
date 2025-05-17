// hooks/useAdminBlog.ts
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/utils';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const useAdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'blogPosts'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  const addPost = async (data: any) => {
    await addDoc(collection(db, 'blogPosts'), data);
    await fetchPosts();
  };

  const updatePost = async (id: string, data: any) => {
    await updateDoc(doc(db, 'blogPosts', id), data);
    await fetchPosts();
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, 'blogPosts', id));
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts().finally(() => setLoadingBlog(false));
  }, []);

  return { posts, loadingBlog, addPost, updatePost, deletePost };
};
