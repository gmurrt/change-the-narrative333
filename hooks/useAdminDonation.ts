// hooks/useAdminDonation.ts
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/utils';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const donationDocRef = doc(db, 'donationContent', 'settings');

export const useAdminDonation = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDonation = async () => {
    const docSnap = await getDoc(donationDocRef);
    if (docSnap.exists()) {
      setContent(docSnap.data());
    } else {
      setContent(null);
    }
  };

  const saveDonationContent = async (data: any) => {
    await setDoc(donationDocRef, data, { merge: true });
    await fetchDonation();
  };

  useEffect(() => {
    fetchDonation().finally(() => setLoading(false));
  }, []);

  return { content, loading, saveDonationContent };
};
