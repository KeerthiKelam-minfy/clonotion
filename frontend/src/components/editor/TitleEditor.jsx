import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function TitleEditor({ docId, initialTitle, canEdit }) {
  const { title, setTitle } = useDocumentTitle(docId, initialTitle);

  return (
    <input
      value={title}
      onChange={(e) => {
        if (!canEdit) return;
        setTitle(e.target.value);
      }}
      className="text-2xl font-semibold mb-4 border-none focus:outline-none w-full"
      placeholder="Untitled"
      readOnly={!canEdit}
      style={{
        cursor: canEdit ? "text" : "not-allowed",
      }}
    />
  );
}
