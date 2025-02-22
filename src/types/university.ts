import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type University = {
  name: string;
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
