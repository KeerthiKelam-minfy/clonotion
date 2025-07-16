import { deleteDoc, doc } from "firebase/firestore";
import { createNewPage } from "./createPage";
import { db } from "../firebase";

export async function handleCreatePage(setPages, navigate) {
  const docId = await createNewPage();
  setPages((prev) => [...prev, { id: docId, title: "Untitled Page" }]);
  navigate(`/document/${docId}`);
}

export async function handleDeletePage(pageId, setPages) {
  await deleteDoc(doc(db, "documents", pageId));
  setPages((prev) => prev.filter((p) => p.id !== pageId));
}
