import { useEffect, useState } from "react";
import api from "../utils/api";
import AppCard from "../components/AppCard";
import { FaSearch } from "react-icons/fa";

const AllApps = () => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/apps.json")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter logic for the search bar
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* 1. Page Header */}
      <div className="py-12 text-center">
        <h1 className="text-3xl font-black text-[#001931] mb-2">Our All Applications</h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* 2. Controls Bar (Count & Search) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-sm font-black text-[#001931]">
            ({filteredApps.length}) Apps Found
          </h2>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search apps..." 
              className="w-full bg-white border border-gray-200 py-2 pl-10 pr-4 rounded-lg text-xs font-bold focus:outline-none focus:border-primary transition-colors"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
          </div>
        </div>

        {/* 3. Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApps;