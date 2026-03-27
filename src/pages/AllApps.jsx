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
      <div className="py-12 text-center">
        <h1 className="text-3xl font-black text-[#001931] mb-2 uppercase italic">OUR ALL APPLICATIONS</h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          EXPLORE ALL APPS ON THE MARKET DEVELOPED BY US. WE CODE FOR MILLIONS
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center md:text-left">
            <h2 className="text-sm font-black text-[#001931]">({sortedApps.length}) Apps Found</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">developed by ZENITH APPS</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
            <div className="relative flex-1 md:w-80 w-full group">
              <input 
                type="text" 
                placeholder="Search apps..." 
                className="input input-bordered input-sm w-full rounded-lg pl-12 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors text-xs" />
            </div>
            <select 
              className="select select-bordered select-sm rounded-lg font-bold text-xs focus:outline-none w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="high-low">High-Low (Downloads)</option>
              <option value="low-high">Low-High (Downloads)</option>
            </select>
          </div>
        </div>
        {sortedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-gray-400 font-bold">
            <p>No apps found matching "{searchTerm}"</p>
            <p className="text-xs text-gray-400 font-medium">Clear your search to see all applications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApps;