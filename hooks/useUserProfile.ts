// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase/utils';

export const useUserProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setProfile(snap.data());
    } else {
      setProfile(null);
    }
  };

  const saveProfile = async (data: any) => {
    if (!userId) return;
    const ref = doc(db, 'users', userId);
    await setDoc(ref, data, { merge: true });
    setProfile(data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        setUserId(user.uid);
        await fetchProfile(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { profile, saveProfile, loading };
};
