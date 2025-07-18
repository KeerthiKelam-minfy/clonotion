import { useParams, useNavigate } from "react-router-dom";
import DocumentNavbar from "../components/DocumentNavbar";
import useDocument from "../hooks/useDocument";
import TitleEditor from "../components/TitleEditor";
import NoAccessScreen from "../components/NoAccessScreen";
import TiptapEditor from "../components/TiptapEditor";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc'
// import { useMemo } from "react";

// const ydoc = new Y.Doc();

function DocumentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documentData, loading, noAccess } = useDocument(id);
  const [htmlContent, setHtmlContent] = useState("");

  // const roomName = `room-${id}`

  // const provider = useMemo(() => {
  //   return new WebrtcProvider(roomName, ydoc);
  // }, [id]);

  const handleEditorContentSave = async (html) => {
    // here, instead of printing, I can also store this data in a database
    // console.log(html)
    setHtmlContent(html);

    // saving to the database
    try {
      await setDoc(doc(db, "documents", id), {
        ...documentData,
        content: html,
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.log("Error saving doc: ", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (noAccess) return <NoAccessScreen navigate={navigate} />;

  // access after loading
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const canEdit =
    documentData.owner === currentUserId || documentData.access === "edit";

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <DocumentNavbar docId={id} />

      <TitleEditor
        docId={id}
        initialTitle={documentData.title}
        canEdit={canEdit}
      />

      {/* Tiptap editor */}
      <TiptapEditor
        onEditorContentSave={handleEditorContentSave}
        initialContent={documentData.content || ""}

      />
      {/* <p className="text-gray-500">Editor will be here...</p> */}
      {/* <ShowContent content={htmlContent}/> */}
    </div>
  );
}

export default DocumentPage;
