import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function TitleEditor({ docId }) {
  const { title, setTitle } = useDocumentTitle(docId);

  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="text-2xl font-semibold mb-4 border-none focus:outline-none w-full"
      placeholder="Untitled"
    />
  );
}
