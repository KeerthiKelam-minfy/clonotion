import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useDebouncedEffect from "./useDebouncedEffect";

export function useDocumentTitle(id) {
  const [title, setTitle] = useState("");
  const [localTitle, setLocalTitle] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "documents", id), (docSnap) => {
      if (docSnap.exists()) {
        const newTitle = docSnap.data().title || "Untitled Page";
        setTitle(newTitle);
        setLocalTitle(newTitle);
      }
    });

    return unsubscribe;
  }, [id]);

  // Debounced update to Firestore
  useDebouncedEffect(() => {
    if (localTitle !== title) {
      updateDoc(doc(db, "documents", id), { title: localTitle });
    }
  }, [localTitle], 50); // 50ms debounce

  return { title: localTitle, setTitle: setLocalTitle };
}
