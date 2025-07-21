import { useParams, useNavigate } from "react-router-dom";
import DocumentNavbar from "../components/DocumentNavbar";
import useDocument from "../hooks/useDocument";
import TitleEditor from "../components/editor/TitleEditor";
import NoAccessScreen from "../components/NoAccessScreen";
import TiptapEditor from "../components/editor/TiptapEditor";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import "./TiptapStyles.css";
import { getDoc } from "firebase/firestore";

const DocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documentData, loading, noAccess } = useDocument(id);
  const [htmlContent, setHtmlContent] = useState("");
  // const [commentsMap, setCommentsMap] = useState({});
  // const [activeCommentId, setActiveCommentId] = useState(null);
  const [initialContent, setInitialContent] = useState("");
  const [access, setAccess] = useState("none");

  const room = id;

  const ydocRef = useRef(null);
  const providerRef = useRef(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc, {
      signaling: ["https://y-webrtc-server-60a7.onrender.com/"],
    });

    ydocRef.current = ydoc;
    providerRef.current = provider;

    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [room]);

  useEffect(() => {
    const fetchDoc = async () => {
      const snap = await getDoc(doc(db, "documents", id));
      if (snap.exists()) {
        setInitialContent(snap.data().content);
      }
    };
    fetchDoc();
  }, [id]);

  // const handleCommentActivated = (commentId) => {
  //   setActiveCommentId(commentId);
  // };

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

    const cannotAccess =
    documentData.owner === currentUserId || documentData.access === "none";

  return (
    <div className="editor-wrapper overflow-y-auto h-screen p-4 bg-gradient-to-b from-amber-100 via-orange-100 to-rose-50">
      <div className="p-4 max-w-3xl mx-auto">
        <DocumentNavbar docId={id} />
        <TitleEditor
          docId={id}
          initialTitle={documentData.title}
          canEdit={canEdit}
        />

<div className="">
<TiptapEditor
          onEditorContentSave={handleEditorContentSave}
          initialContent={documentData.content}
          provider={providerRef.current}
          ydoc={ydocRef.current}
          room={room}
          // commentsMap={commentsMap}
          // setCommentsMap={setCommentsMap}
          // onCommentActivated={handleCommentActivated}
          canEdit={canEdit}
          cannotAccess={cannotAccess}
        />

</div>
        
        {/* {activeCommentId && commentsMap[activeCommentId] && (
          <div className="mt-4 p-3 rounded bg-yellow-100 border border-yellow-300 text-sm text-gray-800">
            💬 <strong>Comment:</strong> {commentsMap[activeCommentId]}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DocumentPage;
