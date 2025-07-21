import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function DocumentNavbar({ docId }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [access, setAccess] = useState("none");
  const [copySuccess, setCopySuccess] = useState(false);

  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const fetchAccess = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if(!user) return;

      const docRef = doc(db, "documents", docId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setAccess(data.access || "none");

        setIsOwner(data.owner === user.uid)
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

  if (!isOwner) return null;

  return (
    <div className="flex justify-end items-center px-4 py-2 border-b bg-inherit relative">
      {/* Share  */}
      <div className="relative">
        <button
          className=" bg-orange-700 px-2 py-1.5 text-white rounded cursor-pointer hover:bg-amber-600"
          onClick={() => setShareOpen((prev) => !prev)}
        >
          Share
        </button>

        {shareOpen && (
          <div className="absolute bg-orange-100 right-0 mt-2 w-64 rounded z-50 p-3">
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
              className="w-full bg-amber-200 hover:bg-amber-100 text-sm px-3 py-2 rounded cursor-pointer"
            >
              {copySuccess ? "Copied!" : "Copy link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentNavbar;
