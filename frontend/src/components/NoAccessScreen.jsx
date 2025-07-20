export default function NoAccessScreen({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <span className="text-xl font-semibold">🐟</span>
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
      </div>
    </div>
  );
}
