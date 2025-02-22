import { DocumentData, FieldValue, QueryDocumentSnapshot } from "firebase/firestore";

export type Post = {
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>;
    text: string;
    createdAt: Date | FieldValue;

    userName: string;
    userProfilePictureSrc: string;
}



export type InteractionType = {
    docId?: string;
    type: "like" | "dislike" | "none";
    createdAt: Date | FieldValue;
}