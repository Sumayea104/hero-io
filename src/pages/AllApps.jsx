import { useEffect, useState } from "react";
import api from "../utils/api";
import AppCard from "../components/AppCard";
import { FaSearch } from "react-icons/fa";

const AllApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    
    api.get("/apps.json")
      .then((res) => {
        setApps(res.data);
        
        setTimeout(() => setLoading(false), 800);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  
  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortOrder === "high-low") return b.downloads - a.downloads;
    if (sortOrder === "low-high") return a.downloads - b.downloads;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* Header Section */}
      <div className="py-12 text-center">
        <h1 className="text-3xl font-black text-[#001931] mb-2 uppercase italic">Our All Applications</h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Controls: Count, Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-sm font-black text-[#001931]">
            ({sortedApps.length}) Apps Found
          </h2>
          
          <div className="flex gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="Search apps..." 
                className="input input-bordered input-sm w-full rounded-lg pl-10 text-xs font-bold focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
            </div>

            {/* Sort */}
            <select 
              className="select select-bordered select-sm rounded-lg font-bold text-xs focus:outline-none"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="high-low">High-Low (Downloads)</option>
              <option value="low-high">Low-High (Downloads)</option>
            </select>
          </div>
        </div>

        {/* Grid Area */}
        {sortedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold">
            No apps found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApps;