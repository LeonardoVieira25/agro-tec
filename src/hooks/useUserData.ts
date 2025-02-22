import { User } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase/init';
import useFirebaseAuth from './useFirebaseAuth';
import { Discussion } from '../types/discussion';
import { UserData } from '../types/userData';
import { useBetween } from 'use-between';
import { useLoadingContext } from '../context/loadingContext';

const useSharedUserData = () => {
  return useState<UserData | null>(null);
};

export function useUserData() {
  const { dispatch } = useLoadingContext();

  const { user } = useFirebaseAuth();
  const [userData, setUserData] = useBetween(useSharedUserData);

  useEffect(() => {
    if (!user) {
      dispatch({ field: 'useUserData.userData', payload: false });
      return;
    }
    dispatch({ field: 'useUserData.userData', payload: true });
    getUserData(user)
      .then((userData) => {
        dispatch({ field: 'useUserData.userData', payload: false });
        setUserData(userData);
      })
      .catch((_error) => {
        dispatch({ field: 'useUserData.userData', payload: false });
      });
  }, [user?.uid]);

  async function getUserData(user: User) {
    dispatch({ field: 'useUserData.getUserData', payload: true });
    const querySnapshot = await getDoc(doc(db, 'users', user.uid));
    const userData = querySnapshot.data() as UserData;
    dispatch({ field: 'useUserData.getUserData', payload: false });
    userData.firebaseData = user;
    return userData;
  }

  async function setSelectedDiscussion(discussion: Discussion | null) {
    if (!user) {
      throw new Error('User is not logged in');
    }

    dispatch({ field: 'useUserData.setSelectedDiscussion', payload: true });
    await setDoc(doc(db, 'users', user.uid), {
      discussionCode: discussion?.code ?? null,
    }).catch((_error) => {
      dispatch({ field: 'useUserData.setSelectedDiscussion', payload: false });
    });
    dispatch({ field: 'useUserData.setSelectedDiscussion', payload: false });

    setUserData((userData) => {
      if (!userData) {
        return null;
      }
      return {
        ...userData,
        discussionCode: discussion?.code ?? null,
      } as UserData;
    });
  }

  return {
    userData,
    setUserData,
    setSelectedDiscussion,
  };
}
