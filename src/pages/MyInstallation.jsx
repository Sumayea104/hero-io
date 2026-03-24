import { useEffect, useState } from "react";
import AppCard from "../components/AppCard";

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);

  useEffect(() => {
    // Load the apps from localStorage on page load
    const savedData = JSON.parse(localStorage.getItem("installed-apps")) || [];
    setInstalledApps(savedData);
  }, []);

  const clearAll = () => {
    localStorage.removeItem("installed-apps");
    setInstalledApps([]);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#001931]">My Installations</h1>
            <p className="text-gray-400 text-xs font-bold uppercase mt-1">Manage your downloaded applications</p>
          </div>
          {installedApps.length > 0 && (
            <button onClick={clearAll} className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">
              Clear All
            </button>
          )}
        </div>

        {installedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {installedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No apps installed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;