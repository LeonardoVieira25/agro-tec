import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type Discussion = {
    code: string;
    nome: string;
    universityCode: string | undefined;
    doc?: QueryDocumentSnapshot<DocumentData, DocumentData>;
}