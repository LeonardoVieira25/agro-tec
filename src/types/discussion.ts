import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type Discussion = {
    code: string;
    nome: string;
    doc?: QueryDocumentSnapshot<DocumentData, DocumentData>;
}