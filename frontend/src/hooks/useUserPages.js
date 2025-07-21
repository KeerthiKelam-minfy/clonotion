import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const useUserPages = () => {
  const [userName, setUserName] = useState("");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        // Get user name
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }

        // Get pages
        const q = query(
          collection(db, "documents"),
          where("owner", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setPages(docs);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userName, pages, setPages, loading };
}

export default useUserPages;