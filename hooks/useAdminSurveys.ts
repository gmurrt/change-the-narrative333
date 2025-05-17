// hooks/useAdminSurveys.ts
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

export const useAdminSurveys = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSurveys = async () => {
    const snapshot = await getDocs(collection(db, 'surveys'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSurveys(data);
  };

  const addSurvey = async (data: any) => {
    await addDoc(collection(db, 'surveys'), data);
    await fetchSurveys();
  };

  const updateSurvey = async (id: string, data: any) => {
    await updateDoc(doc(db, 'surveys', id), data);
    await fetchSurveys();
  };

  const deleteSurvey = async (id: string) => {
    await deleteDoc(doc(db, 'surveys', id));
    await fetchSurveys();
  };

  useEffect(() => {
    fetchSurveys().finally(() => setLoading(false));
  }, []);

  return { surveys, loading, addSurvey, updateSurvey, deleteSurvey };
};
