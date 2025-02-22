import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/init";
import { University } from "../types/university";


export default function useUniversity() {
    async function getUniversities() : Promise<University[]> {
        const q = query(collection(db, "university"));
        const querySnapshot = await getDocs(q);
        const universities: University[] = [];
        querySnapshot.forEach((doc) => {
            universities.push(doc.data() as University);
        });
        console.log(universities);
        return universities;
    }

    return {
        getUniversities
    }
}