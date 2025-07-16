import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function useDocument(id) {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noAccess, setNoAccess] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
        } else {
          setNoAccess(true);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setNoAccess(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  return { documentData, loading, noAccess };
}
