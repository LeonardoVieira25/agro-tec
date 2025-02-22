import { User } from "firebase/auth";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/init";
import useFirebaseAuth from "./useFirebaseAuth";
import { Discussion } from "../types/discussion";
import { useBetween } from "use-between";
import { getUniversityCode } from "../utils/university";

const useSharedSubmission = () => {
  return useState<Discussion | null>(null);
};

export function useSubmission() {
  const { user } = useFirebaseAuth();
  const [submission, setSubmission] = useBetween(useSharedSubmission);

  async function getSubmission(user: User) {
    const querySnapshot = await getDoc(
      doc(db, "users", user.uid, "submitted", "discussion")
    );
    const submission = querySnapshot.data() as Discussion;
    return submission;
  }

  async function submitCourse(user: User, discussion: Discussion) {
    await setDoc(doc(db, "users", user.uid, "submitted", "discussion"), {
      ...discussion,
      universityCode: getUniversityCode(user),
    });
    setSubmission(discussion);
  }

  async function deleteSubmission(user: User) {
    await deleteDoc(doc(db, "users", user.uid, "submitted", "discussion"));
    setSubmission(null);
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    getSubmission(user).then((submission) => {
      setSubmission(submission);
    });
  }, [user]);

  return {
    submission,
    submitCourse,
    deleteSubmission,
  };
}
