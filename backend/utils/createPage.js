import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createNewPage() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, "documents"), {
    title: "Untitled Page",
    content: "",
    owner: user.uid,
    createdAt: serverTimestamp(),
  });

  return docRef.id; // we will use this to navigate
}
