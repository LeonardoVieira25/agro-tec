import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useLoadingContext } from '../context/loadingContext';
import { db } from '../firebase/init';
import { Discussion } from '../types/discussion';
import { Post } from '../types/post';
import useFirebaseAuth from './useFirebaseAuth';

function useSharedIsAdmin() {
  return useState<boolean>(false);
}

export default function useAdmin() {
  const { dispatch } = useLoadingContext();

  const { user } = useFirebaseAuth();
  const [isAdmin, setIsAdmin] = useBetween(useSharedIsAdmin);

  const [submittedDiscussion, setSubmittedDiscussion] = useState<Discussion[]>([]);

  async function getSubmitted() {
    const q = query(collectionGroup(db, 'submitted'));

    const querySnapshot = getDocs(q);

    dispatch({ field: 'useAdmin.getSubmitted', payload: true });
    return querySnapshot
      .then((querySnapshot) => {
        const discussions: Discussion[] = [];

        dispatch({ field: 'useAdmin.getSubmitted', payload: false });

        querySnapshot.forEach((doc) => {
          if (doc.exists() && doc.id == 'discussion') {
            discussions.push({
              ...doc.data(),
              doc: doc,
            } as Discussion);
          }
        });
        setSubmittedDiscussion(discussions);
      })
      .catch((error) => {
        dispatch({ field: 'useAdmin.getSubmitted', payload: false });
        console.log('Error getting documents: ', error);
      });
  }

  async function aproveDiscussion(discussion: Discussion) {
    if (!discussion.doc) {
      console.error('Course.doc is undefined');
      return;
    }

    const discussionRef = collection(
      db,
      'discussions'
    );
    const newDocRef = doc(discussionRef, discussion.code);

    dispatch({ field: 'useAdmin.aproveDiscussion', payload: true });

    await setDoc(newDocRef, {
      code: discussion.code,
      nome: discussion.nome,
    }).catch((error) => {
      console.error('Error adding document: ', error);
      dispatch({ field: 'useAdmin.aproveDiscussion', payload: false });
    });

    // delete discussion.doc;
    await deleteDoc(discussion.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
    dispatch({ field: 'useAdmin.aproveDiscussion', payload: false });
  }

  async function rejectCourse(discussion: Discussion) {
    if (!discussion.doc) {
      console.error('Course.doc is undefined');
      return;
    }

    dispatch({ field: 'useAdmin.rejectCourse', payload: true });

    await deleteDoc(discussion.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
    dispatch({ field: 'useAdmin.aproveDiscussion', payload: true });
  }

  async function getIsAdmin() {
    if (!user) {
      setIsAdmin(false);
      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      return;
    }

    try {
      setIsAdmin(true);
    } catch (error) {
      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      console.error('Error fetching admin status:', error);
      setIsAdmin(false);
    }
  }

  async function deleteDiscussion(discussion: Discussion) {
    if (!discussion.doc) {
      console.error('Discussion.doc is undefined');
      return;
    }
    await deleteDoc(discussion.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
  }

  async function deletePost(post: Post) {
    if (!post.doc) {
      console.error('post.doc is undefined');
      return;
    }
    await deleteDoc(post.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
  }


  useEffect(() => {
    if (!user) {
      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      setIsAdmin(false);
      return;
    }
    getIsAdmin();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;

    getSubmitted();
  }, [isAdmin]);

  return {
    isAdmin,
    submittedDiscussion,
    aproveDiscussion,
    rejectCourse,
    deleteDiscussion,
    deletePost,
  };
}
