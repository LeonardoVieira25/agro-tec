import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/init';
import useDiscussions from './useDiscussion';
import { useUserData } from '../hooks/useUserData';
import { Post } from '../types/post';
import { getUniversityCode } from '../utils/university';

export default function usePosts(
  parentPostId?: string,
  universityCodeParam?: string,
  discussionCodeParam?: string
) {
  const { userData } = useUserData();
  const { userCourse } = useDiscussions();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const universityCode =
      universityCodeParam ||
      (userData?.firebaseData && getUniversityCode(userData.firebaseData));

    if (!universityCode) {
      return;
    }

    const discussionCode = discussionCodeParam || userData?.discussionCode;
    if (!discussionCode) {
      console.log('No discussion code found');
      return;
    }

    const q = query(
      !parentPostId
        ? collection(
            db,
            'university',
            universityCode,
            'discussions',
            discussionCode,
            'posts'
          )
        : collection(
            db,
            'university',
            universityCode,
            'discussions',
            discussionCode,
            'posts',
            parentPostId,
            'replies'
          )
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        const newPost = doc.data() as Post;
        posts.push({
          ...newPost,
          createdAt: newPost.createdAt
            ? (newPost.createdAt as Timestamp).toDate()
            : new Date(),
          doc: doc,
        } as Post);
      });
      posts.sort(
        (a, b) =>
          (a.createdAt as Date).getTime() - (b.createdAt as Date).getTime()
      );
      setPosts(posts);
    });

    return () => unsubscribe();
  }, [userData, parentPostId]);

  async function makePost(text: string) {
    const universityCode =
      userData?.firebaseData && getUniversityCode(userData.firebaseData);

    if (!universityCode) {
      console.log('No university code found');
      return;
    }

    if (!userData.discussionCode) {
      console.log('No discussion code found');
      return;
    }

    const postsCollection = !parentPostId
      ? collection(
          db,
          'university',
          universityCode,
          'discussions',
          userData.discussionCode,
          'posts'
        )
      : collection(
          db,
          'university',
          universityCode,
          'discussions',
          userData.discussionCode,
          'posts',
          parentPostId,
          'replies'
        );

    const newDoc = doc(postsCollection);

    const userFirstName =
      userData.firebaseData?.displayName?.split(' ')[0] || 'anônimo';
    const userFirstNameCapitalized =
      userFirstName?.at(0)?.toLocaleUpperCase() +
      userFirstName?.substring(1).toLocaleLowerCase();
    setDoc(newDoc, {
      text,
      userName: userFirstNameCapitalized,
      userProfilePictureSrc: userData.firebaseData?.photoURL,
      createdAt: serverTimestamp(),
    } as Post).catch((error) => {
      console.log(error);
    });
  }

  return {
    posts,
    makePost,
    userCourse,
  };
}
