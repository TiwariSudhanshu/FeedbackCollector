async function getFeedbacks() {
    const res = await fetch("/api/feedback", {cache: "no-store"});
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  
  export default async function Feedbacks() {
    const feedbacks = await getFeedbacks();
    
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white border-b border-gray-700 pb-4">
            Feedback Collection
          </h1>
          
          {feedbacks.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <p className="text-gray-400 text-lg">No feedback submissions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb:any) => (
                <div key={fb.id} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <h2 className="text-xl font-semibold text-white mb-2">{fb.name}</h2>
                    <span className="text-gray-400 text-sm">{fb.email}</span>
                  </div>
                  <p className="mt-3 text-gray-300 border-t border-gray-700 pt-4">{fb.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }