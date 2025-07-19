import { useParams, useNavigate } from "react-router-dom";
import DocumentNavbar from "../components/DocumentNavbar";
import useDocument from "../hooks/useDocument";
import TitleEditor from "../components/TitleEditor";
import NoAccessScreen from "../components/NoAccessScreen";
import TiptapEditor from "../components/TiptapEditor";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import "./TiptapStyles.css";

function DocumentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documentData, loading, noAccess } = useDocument(id);
  const [htmlContent, setHtmlContent] = useState("");

  const room = id;

  // Refs for yjs and provider
  const ydocRef = useRef(null);
  const providerRef = useRef(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc, {
      signaling: ["ws://localhost:4444"],
    });

    ydocRef.current = ydoc;
    providerRef.current = provider;

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [room]);

  const handleEditorContentSave = async (html) => {
    setHtmlContent(html);

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

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const canEdit =
    documentData.owner === currentUserId || documentData.access === "edit";

  return (
    <div className="editor-wrapper overflow-y-auto h-screen p-4">
      <div className="p-4 max-w-3xl mx-auto">
        <DocumentNavbar docId={id} />
        <TitleEditor
          docId={id}
          initialTitle={documentData.title}
          canEdit={canEdit}
        />

        <TiptapEditor
          onEditorContentSave={handleEditorContentSave}
          initialContent={documentData.content || ""}
          provider={providerRef.current}
          ydoc={ydocRef.current}
          room={room}
        />
      </div>
    </div>
  );
}

export default DocumentPage;
