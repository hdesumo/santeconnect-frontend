export default function LoadingEtablissement() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="animate-pulse bg-white shadow rounded-xl p-8 border border-gray-200">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="flex space-x-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
