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
        // Visual loader delay for premium feel
        setTimeout(() => setLoading(false), 800);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  // 1. Filter Logic
  const filteredApps = apps.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Robust Sorting Logic
  const sortedApps = [...filteredApps].sort((a, b) => {
    // String content (like "1.2M") ke number-e convert korar utility
    const getNum = (val) => {
      if (!val) return 0;
      // Jodi "5M" ba "10k" thake, parseFloat shudhu number-ta nibe
      return parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
    };

    const valA = getNum(a.downloads);
    const valB = getNum(b.downloads);

    if (sortOrder === "high-low") return valB - valA;
    if (sortOrder === "low-high") return valA - valB;
    
    return 0; // Default: No sorting
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
        <span className="loading loading-spinner loading-lg text-[#00D391]"></span>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Marketplace...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20 pt-10 px-6">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-[#001931] mb-2 uppercase italic tracking-tight">
          Zenith Marketplace
        </h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          Explore {apps.length}+ Premium Applications Developed by Us
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Controls: Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="text-center md:text-left border-l-4 border-[#00D391] pl-4">
            <h2 className="text-sm font-black text-[#001931] uppercase">
              ({sortedApps.length}) Apps Found
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">In Current Category</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
            {/* Search Input */}
            <div className="relative flex-1 md:w-80 w-full group">
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="input input-bordered input-md w-full rounded-xl pl-12 text-sm font-bold focus:outline-none focus:border-[#00D391] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#00D391] transition-colors" />
            </div>

            {/* Sort Dropdown */}
            <select 
              className="select select-bordered select-md rounded-xl font-bold text-xs focus:outline-none w-full md:w-auto bg-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By (Default)</option>
              <option value="high-low">High to Low (Downloads)</option>
              <option value="low-high">Low to High (Downloads)</option>
            </select>
          </div>
        </div>

        {/* Apps Display Grid */}
        {sortedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {sortedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
            <div className="text-5xl mb-4 opacity-30 grayscale">🔍</div>
            <h3 className="text-[#001931] font-black uppercase italic tracking-widest">No Results Found</h3>
            <p className="text-[10px] text-gray-400 mt-2 font-bold">
              We couldn't find any app matching "{searchTerm}"
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-6 text-[10px] font-black uppercase text-[#00D391] border-b-2 border-[#00D391] pb-1"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApps;