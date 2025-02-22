import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useLoadingContext } from '../context/loadingContext';
import { db } from '../firebase/init';
import { Discussion } from '../types/discussion';
import useFirebaseAuth from './useFirebaseAuth';
import { University } from '../types/university';
import { Post } from '../types/post';

function useSharedIsAdmin() {
  return useState<boolean>(false);
}

export default function useAdmin() {
  const { dispatch } = useLoadingContext();

  const { user } = useFirebaseAuth();
  const [isAdmin, setIsAdmin] = useBetween(useSharedIsAdmin);

  const [submittedCourses, setSubmittedCourses] = useState<Discussion[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

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
        setSubmittedCourses(discussions);
      })
      .catch((error) => {
        dispatch({ field: 'useAdmin.getSubmitted', payload: false });
        console.log('Error getting documents: ', error);
      });
  }

  async function aproveCourse(discussion: Discussion) {
    if (!discussion.doc) {
      console.error('Course.doc is undefined');
      return;
    }

    // Add discussion to university collection
    const discussionRef = collection(
      db,
      'university',
      `${discussion.universityCode}`,
      'discussions'
    );
    const newDocRef = doc(discussionRef, discussion.code);

    dispatch({ field: 'useAdmin.aproveCourse', payload: true });

    await setDoc(newDocRef, {
      code: discussion.code,
      nome: discussion.nome,
    }).catch((error) => {
      console.error('Error adding document: ', error);
      dispatch({ field: 'useAdmin.aproveCourse', payload: false });
    });

    // delete discussion.doc;
    await deleteDoc(discussion.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
    dispatch({ field: 'useAdmin.aproveCourse', payload: false });
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
    dispatch({ field: 'useAdmin.aproveCourse', payload: true });
  }

  async function getIsAdmin() {
    if (!user) {
      setIsAdmin(false);
      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      return;
    }

    try {
      dispatch({ field: 'useAdmin.getIsAdmin', payload: true });
      const docSnapshot = await getDoc(doc(db, 'admins', user.uid));

      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      if (docSnapshot.exists()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      dispatch({ field: 'useAdmin.getIsAdmin', payload: false });
      console.error('Error fetching admin status:', error);
      setIsAdmin(false);
    }
  }

  async function getUniversities() {
    const q = query(collection(db, 'university'));

    const querySnapshot = getDocs(q);

    // dispatch({ field: "useAdmin.getUniversities", payload: true });
    return querySnapshot
      .then((querySnapshot) => {
        const universities: any[] = [];

        // dispatch({ field: "useAdmin.getUniversities", payload: false });

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            universities.push({
              ...doc.data(),
              doc: doc,
            });
          }
        });
        setUniversities(universities);
        return universities;
      })
      .catch((error) => {
        // dispatch({ field: "useAdmin.getUniversities", payload: false });
        console.log('Error getting documents: ', error);
      });
  }

  async function deleteCourse(discussion: Discussion) {
    if (!discussion.doc) {
      console.error('Course.doc is undefined');
      return;
    }
    // dispatch({ field: "useAdmin.deleteCourse", payload: true });
    await deleteDoc(discussion.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
    // dispatch({ field: "useAdmin.deleteCourse", payload: false });
  }

  async function deletePost(post: Post) {
    if (!post.doc) {
      console.error('post.doc is undefined');
      return;
    }
    // dispatch({ field: "useAdmin.deletePost", payload: true });
    await deleteDoc(post.doc.ref).catch((error) => {
      console.error('Error deleting document: ', error);
    });

    await getSubmitted();
    // dispatch({ field: "useAdmin.deletePost", payload: false });
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
    getUniversities();
  }, [isAdmin]);

  return {
    isAdmin,
    submittedCourses,
    aproveCourse,
    rejectCourse,
    universities,
    deleteCourse,
    deletePost,
  };
}
