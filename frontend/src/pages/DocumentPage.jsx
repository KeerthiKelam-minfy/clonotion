import { useParams, useNavigate } from "react-router-dom";
import DocumentNavbar from "../components/DocumentNavbar";
import useDocument from "../hooks/useDocument";
import TitleEditor from "../components/TitleEditor";
import NoAccessScreen from "../components/NoAccessScreen";

function DocumentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { documentData, loading, noAccess } = useDocument(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (noAccess) return <NoAccessScreen navigate={navigate} />;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <DocumentNavbar docId={id} />
      <TitleEditor docId={id} initialTitle={documentData.title} />

      {/* Add Tiptap editor here */}
      <p className="text-gray-500">Editor will be here...</p>
    </div>
  );
}

export default DocumentPage;
