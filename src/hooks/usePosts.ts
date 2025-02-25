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
import { useUserData } from '../hooks/useUserData';
import { Post } from '../types/post';
import useDiscussions from './useDiscussion';

export default function usePosts(
  parentPostId?: string,
  discussionCodeParam?: string
) {
  const { userData } = useUserData();
  const { userDiscussion } = useDiscussions();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const discussionCode = discussionCodeParam || userData?.discussionCode;
    if (!discussionCode) {
      console.log('No discussion code found');
      return;
    }

    const q = query(
      !parentPostId
        ? collection(
          db,
          'discussions',
          discussionCode,
          'posts'
        )
        : collection(
          db,
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
    if (!userData) {
      console.error("usuario not found")
      return
    }
    if (!userData.discussionCode) {
      console.log('No discussion code found');
      return;
    }

    const postsCollection = !parentPostId
      ? collection(
        db,
        'discussions',
        userData.discussionCode,
        'posts'
      )
      : collection(
        db,
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
    userDiscussion,
  };
}
