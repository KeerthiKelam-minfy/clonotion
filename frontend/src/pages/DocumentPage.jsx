import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function DocumentPage() {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noAccess, setNoAccess] = useState(false);
  const [title, setTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
          setTitle(docSnap.data().title || "Untitled Page");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (noAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <span className="text-xl font-semibold">K</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">No access to this page</h2>
        <p className="text-gray-600 mb-4">
          You can access this page if someone approves your request.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Back to my content
          </button>

          <button
            disabled
            className="px-4 py-2 bg-blue-500 text-white rounded opacity-50 cursor-not-allowed"
          >
            Request access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {editingTitle ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={async () => {
            setEditingTitle(false);
            if (title.trim()) {
              await updateDoc(doc(db, "documents", id), { title: title.trim() });
            }
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              setEditingTitle(false);
              if (title.trim()) {
                await updateDoc(doc(db, "documents", id), { title: title.trim() });
              }
            }
          }}
          className="text-2xl font-semibold mb-4 border-b focus:outline-none w-full"
        />
      ) : (
        <h1
          className="text-2xl font-semibold mb-4 cursor-pointer"
          onClick={() => setEditingTitle(true)}
        >
          {title}
        </h1>
      )}

      {/* Add Tiptap editor here */}
      <p className="text-gray-500">Editor will be here...</p>
    </div>
  );
}

export default DocumentPage;
