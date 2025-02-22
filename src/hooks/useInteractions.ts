import { collection, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { InteractionType, Post } from "../types/post";
import { getUniversityCode } from "../utils/university";
import { useUserData } from "./useUserData";
import { db } from "../firebase/init";
import { useEffect, useState } from "react";




export default function useInteractions(post: Post) {
    const { userData } = useUserData();

    const [interactions, setInteractions] = useState<InteractionType[]>([]);


    useEffect(() => {
        const universityCode =
            userData?.firebaseData && getUniversityCode(userData.firebaseData);

        if (!universityCode) {
            console.log("No university code found");
            return;
        }

        if (!userData.discussionCode) {
            console.log("No discussion code found");
            return;
        }

        const postsCollection = collection(
            db,
            "university",
            universityCode,
            "discussions",
            userData.discussionCode,
            "posts"
        );

        const interactionCollection = collection(
            postsCollection,
            post.doc.id,
            "interactions"
        );

        const unsubscribe = onSnapshot(interactionCollection, (querySnapshot) => {
            const interactions: InteractionType[] = [];
            querySnapshot.forEach((doc) => {
                interactions.push({ ...doc.data(), docId: doc.id } as InteractionType);
            });
            setInteractions(interactions);
        });

        return () => unsubscribe();

    }, [post.doc.id])



    async function addInteraction(interaction: InteractionType, post: Post, parentPostId?: string) {
        const universityCode =
            userData?.firebaseData && getUniversityCode(userData.firebaseData);

        if (!universityCode) {
            console.log("No university code found");
            return;
        }

        if (!userData.discussionCode) {
            console.log("No discussion code found");
            return;
        }

        const userId = userData.firebaseData?.uid;

        if (!userId) {
            console.log("No user found");
            return;
        }

        const postsCollection = !parentPostId
            ? collection(
                db,
                "university",
                universityCode,
                "discussions",
                userData.discussionCode,
                "posts"
            )
            : collection(
                db,
                "university",
                universityCode,
                "discussions",
                userData.discussionCode,
                "posts",
                parentPostId,
                "replies"
            );

        const interactionCollection = collection(
            postsCollection,
            post.doc.id,
            "interactions"
        );

        const newDoc = doc(interactionCollection, userId);

        setDoc(newDoc, {
            type: interaction.type,
            createdAt: serverTimestamp()
        }).catch((error) => {
            console.log(error);
        });
    }


    return {
        addInteraction,
        interactions
    };

}