import { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function DocumentNavbar({ docId }) {
  const [starred, setStarred] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [access, setAccess] = useState("none");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchAccess = async () => {
      const docRef = doc(db, "documents", docId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setAccess(snap.data().access || "none");
      }
    };
    fetchAccess();
  }, [docId]);

  const handleAccessChange = async (value) => {
    setAccess(value);
    const docRef = doc(db, "documents", docId);
    await updateDoc(docRef, { access: value });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/document/${docId}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex justify-end items-center px-4 py-2 border-b bg-white relative">
      {/* Share */}
      <div className="relative">
        <button
          onClick={() => setShareOpen((prev) => !prev)}
          className="text-gray-700 hover:bg-gray-100 px-3 py-1 rounded text-sm"
        >
          Share
        </button>

        {shareOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow z-50 p-3">
            <p className="text-sm font-medium mb-2">Anyone with the link:</p>

            <div className="space-y-1 mb-3">
              {["view", "edit", "none"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="access"
                    value={opt}
                    checked={access === opt}
                    onChange={() => handleAccessChange(opt)}
                    className="form-radio"
                  />
                  <span className="capitalize">
                    {opt === "none" ? "Cannot access" : `Can ${opt}`}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded"
            >
              {copySuccess ? "Copied!" : "Copy link"}
            </button>
          </div>
        )}
      </div>

      {/* Star */}
      <button
        onClick={() => setStarred(!starred)}
        className="ml-2 p-2 hover:bg-gray-100 rounded"
        title="Star"
      >
        <FiStar
          className={`w-5 h-5 ${starred ? "text-yellow-400 fill-yellow-400" : "text-gray-700"}`}
        />
      </button>
    </div>
  );
}

export default DocumentNavbar;
