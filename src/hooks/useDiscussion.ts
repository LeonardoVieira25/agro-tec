import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { db } from '../firebase/init';
import { Discussion } from '../types/discussion';
import useFirebaseAuth from './useFirebaseAuth';
import { useUserData } from './useUserData';

function useSharedUserDiscussion() {
  return useState<Discussion>();
}
function useSharedUserDiscussions() {
  return useState<Discussion[]>([]);
}

export default function useDiscussions() {
  const [userDiscussions, setUserDiscussions] = useBetween(useSharedUserDiscussions);
  const [userDiscussion, setUserDiscussion] = useBetween(useSharedUserDiscussion);

  const { user } = useFirebaseAuth();

  const { userData } = useUserData();

  useEffect(() => {
    getUserCourse()
  }, [userData?.discussionCode + ""]);


  useEffect(() => {
    if (!user) {
      return;
    }
    getUserDiscussions(user).then((discussions) => {
      setUserDiscussions(discussions);
    });
  }, [user])


  async function getDiscussions() {
    const q = query(collection(db, "discussions"));
    const querySnapshot = await getDocs(q);
    const discussions: Discussion[] = [];
    querySnapshot.forEach((doc) => {
      discussions.push({ ...doc.data(), doc: doc } as Discussion);
    });
    return discussions;
  }

  async function getUserDiscussions(user: User) {
    const email = user.email;
    if (!email) {
      setUserDiscussions([]);
      return [];
    }
    const userCourses = await getDiscussions();
    setUserDiscussions(userCourses);
    return userCourses;
  }

  async function getUserCourse() {
    if (!userData?.discussionCode || !user) {
      return null;
    }

    const discussionDoc = await getDoc(
      doc(db, 'discussions', userData.discussionCode)
    );
    if (!discussionDoc.exists()) {
      console.error('Course not found');
      return null;
    }
    const discussion = discussionDoc.data() as Discussion;
    setUserDiscussion(discussion);
    return discussion;
  }

  return {
    userDiscussion,
    userDiscussions,
    getDiscussions,
    getUserDiscussions,
    getUserCourse,
    userData,
  };
}