import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuComponent from "./BubbleMenu";
import { useEffect, useRef } from "react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
// import { CommentExtension } from "./CommentExtension";
import EditorToolbar from "./EditorToolbar";

const TiptapEditor = ({
  onEditorContentSave,
  initialContent,
  ydoc,
  provider,
  room,
  canEdit,
}) => {
  const colors = [
    "#958DF1",
    "#F98181",
    "#FBBC88",
    "#FAF594",
    "#70CFF8",
    "#94FADB",
    "#B9F18D",
    "#C3E2C2",
    "#EAECCC",
    "#AFC8AD",
    "#EEC759",
    "#9BB8CD",
    "#FF90BC",
    "#FFC0D9",
    "#DC8686",
    "#7ED7C1",
    "#F3EEEA",
    "#89B9AD",
    "#D0BFFF",
    "#FFF8C9",
    "#CBFFA9",
    "#9BABB8",
    "#E3F4F4",
  ];

  // const [comments, setComments] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(null);

  // const addCommentToMap = (id, text) => {
  //   setComments((prev) => ({
  //     ...prev,
  //     [id]: text,
  //   }));
  // };

  const getRandomElement = (list) =>
    list[Math.floor(Math.random() * list.length)];

  const getRandomColor = () => getRandomElement(colors);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      let name = user.displayName || user.email || "Anonymous";

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.name) {
            name = userData.name;
          }
        }
      } catch (err) {
        console.error("Failed to fetch user from Firestore", err);
      }

      setCurrentUser({
        name,
        color: getRandomColor(),
      });
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!provider || !currentUser) return;

    const awareness = provider.awareness;

    awareness.setLocalStateField("user", {
      name: currentUser.name,
      color: currentUser.color,
      status: "viewing",
    });

    return () => {
      awareness.setLocalStateField("user", null);
    };
  }, [provider, currentUser]);

  const extensions = [
    StarterKit,
    Collaboration.extend().configure({
      document: ydoc,
    }),
    CollaborationCaret.extend().configure({
      provider,
    }),
    // CommentExtension.configure({
    //   onCommentActivated: (id) => console.log("Activated comment:", id),
    // }),
  ];

  const debounceTimer = useRef(null);

  const editor = useEditor({
  editable: canEdit,
  enableContentCheck: true,
  onContentError: ({ disableCollaboration }) => {
    disableCollaboration();
  },
  onUpdate: ({ editor }) => {
    if (!canEdit) return;

    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      try {
        const html = editor.getHTML();
        console.log("Auto-saving content:", html);
        onEditorContentSave(html);
      } catch (err) {
        console.error("Failed to getHTML:", err);
      }
    }, 1500);
  },
  extensions,
});

  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  useEffect(() => {
    if (!provider) return;

    const awareness = provider.awareness;

    const handleAwarenessChange = () => {
      const states = Array.from(awareness.getStates().values());
      const users = states.map((state) => state.user).filter(Boolean);
      setOnlineUsers(users);
    };

    awareness.on("change", handleAwarenessChange);

    return () => {
      awareness.off("change", handleAwarenessChange);
    };
  }, [provider]);

  // // fixes the bug of abnormal behaviour of the pages content.
  // useEffect(() => {
  //   if (editor && initialContent !== editor.getHTML()) {
  //     editor.commands.setContent(initialContent, false); // false = don't add to history
  //   }
  // }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-shield">
      {canEdit && <EditorToolbar editor={editor} />}
      <div>
        <BubbleMenuComponent
          editor={editor}
          // commentsMap={comments}
          // setCommentsMap={setComments}
        />

        <EditorContent editor={editor} />
      </div>

      <div
        className="collab-status-group"
        data-state={status === "connected" ? "online" : "offline"}
      >
        {currentUser && (
          <div
            style={{
              backgroundColor: currentUser.color,
              padding: "4px 8px",
              borderRadius: "4px",
              color: "white",
              marginLeft: "8px",
            }}
          >
            👤 {currentUser.name}
          </div>
        )}
        {onlineUsers.length > 1 && (
          <div className="mt-2 flex gap-2 items-center text-sm flex-wrap">
            👀 Others viewing:
            {onlineUsers
              .filter((u) => u.name !== currentUser?.name)
              .map((user, index) => (
                <div
                  key={index}
                  className="px-2 py-1 rounded text-white"
                  style={{
                    backgroundColor: user.color || "#ccc",
                  }}
                >
                  {user.name}
                </div>
              ))}
          </div>
        )}
      </div>

{!canEdit && (
  <div className="p-2 bg-yellow-100 text-yellow-800 rounded mb-2 text-sm border border-yellow-300">
    🔒 This document is in <strong>view-only</strong> mode.
  </div>
)}

      {/* <button onClick={handleEditorContent}>Save</button> */}
    </div>
  );
};

export default TiptapEditor;
